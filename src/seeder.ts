/* eslint-disable prettier/prettier */
import mongoose from "mongoose";
import { dirname } from 'path';
import dotenv from "dotenv";
import loanTypeModel from './models/loan/loan-type.model';
import accountTypeModel from './models/account/account-type.model';
import AccountModel from './models/account/account.model';
import {loanType} from './utils/lib/loan-type.data';
import {accountType} from './utils/lib/account-type.data';
import {account} from './utils/lib/account.data';

dotenv.config({ path: dirname( module.paths[1] ) + "/.env" });
// console.log(process.env.databaseUrl);

mongoose
  .connect(process.env.databaseUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected')
  })
  .catch((error) => console.log("DB Connection Failed", error.message));

const importLoanTypes = async () => {
  try {
    // delete previous data | avoid duplication
    await loanTypeModel.deleteMany();
    await loanTypeModel.insertMany(loanType);
    console.log("Loan Types imported");
    process.exit(0);
  } catch (error) {
    console.log("Loan Types not imported", error.message);
    process.exit(1);
  }
};

const importAccountTypes = async () => {
  try {
    // delete previous data | avoid duplication
    await accountTypeModel.deleteMany();
    await accountTypeModel.insertMany(accountType);
    console.log("Account Types imported");
    process.exit(0);
  } catch (error) {
    console.log("Account Types not imported", error.message);
    process.exit(1);
  }
};

const getLeafNodes = (nodes, result = [], parent = null, parent_data = {}) => {
  for(let i = 0, length = nodes.length; i < length; i++){
    const newAccount = new AccountModel(nodes[i])
    if(!nodes[i].child || nodes[i].child.length === 0){
      const ances = buildAncestors(parent_data)
      const slug = slugify(nodes[i]["account_name"])
      nodes[i]["slug"] = slug
      nodes[i]["ancestors"] = ances
      const noChildAccount = new AccountModel(nodes[i])
      noChildAccount["parent"] = parent
      result.push(noChildAccount);
    }else{
      
      const obj = {}
      obj["account_name"] = nodes[i].account_name
      obj["is_group"] = nodes[i].is_group
      obj["parent"] = parent
      const ancest = buildAncestors(parent_data)
      const slug = slugify(obj["account_name"])
      obj["slug"] = slug
      obj["ancestors"] = ancest
      const childAccount = new AccountModel(obj)
      result.push(childAccount);
      result = getLeafNodes(nodes[i].child, result, childAccount._id, childAccount);
    }
  }
  return result
}

const importAccount = async (account) => {
  try {
    const result = getLeafNodes(account);
    await AccountModel.deleteMany();
    await AccountModel.insertMany(result); 
    //console.log(result);
    process.exit(0);
  } catch (error) {
    console.log("Account not imported", error.message);
    process.exit(1);
  }
   
}

const buildAncestors = (node) => {
  const ancest = [];
  try {
      if( node ) {
          const { _id, account_name, slug } = node;
          const ancest = [...node.ancestors];
          ancest.unshift({ _id, account_name, slug })
          return ancest
      }
  } catch (err) {
      console.log(err.message)
  }
}

const slugify = (string: string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

importLoanTypes()
importAccountTypes()
importAccount(account)
