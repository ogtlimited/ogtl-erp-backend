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
import DesignationModel  from '@models/employee/designation.model';

dotenv.config({ path: dirname( module.paths[1] ) + "/.env" });
// console.log(process.env.databaseUrl);

mongoose
  .connect(process.env.databaseUrl, {
    
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
const createDesignations = async () => {
  try {
    // delete previous data | avoid duplication
    await DesignationModel.create({
      "designation": "SUPER"
    });
   
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

const addNumber = (slug) => {
  let number_prefix;
  switch (slug) {
    case 'accounts-receivable':
      number_prefix = "1"
      break;
    case 'cash-in-hand':
      number_prefix = "2"
      break;
    case 'current-asset':
      number_prefix = "3"
      break;
    case 'fixed-asset':
      number_prefix = "4"
      break;
    case 'account-payable':
      number_prefix = "5"
      break;
    default:
      number_prefix = "0"
  }

  return number_prefix
}

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
      noChildAccount.number_prefix = addNumber(slug)
      if(nodes[i]["account_number"]){
        noChildAccount["account_number"] = addNumber(nodes[i]["ancestors"][0].slug) + nodes[i]["account_number"]
      }
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
      childAccount.number_prefix = addNumber(slug)
      if(nodes[i]["account_number"]){
        childAccount["account_number"] = addNumber(obj["ancestors"][0].slug) + nodes[i]["account_number"]
      }
      
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
          const { _id, account_name, slug, number_prefix } = node;
          const ancest = [...node.ancestors];
          ancest.unshift({ _id, account_name, slug, number_prefix })
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
createDesignations()
