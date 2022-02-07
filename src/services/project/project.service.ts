/* eslint-disable prettier/prettier */

import projectModel from '@/models/project/project.model';
import RoleModel from '@/models/role/role.model';
import EmployeeModel from '@/models/employee/employee.model';
import { IProject } from '@/interfaces/project-interface/project.interface';
import { IRole } from '@/interfaces/role/role.interface';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProjectDto, UpdateProjectDto, ApproveProjectDto, UpdateTeamLeadDto, UpdateTeamMembersDto } from '@/dtos/project/project.dto';
import {campaignCreationEmail} from '@utils/email';
import { slugify } from '@/utils/slugify';

const { SocketLabsClient } = require('@socketlabs/email');
const projectList =[
    {
      "Campaign_name": "CS Live 1",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "About the campaign. Leave blank ",
      "shift_start": "14:30",
      "shift_end": "22:30",
      "start_date": "When the campaign started ",
      "end_date": "",
      "number_of_employees": 27,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["shadrach.yissa@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["seyi.adekoya@outsourceglobal.net","parkwat.theophilus@outsourceglobal.net","chukwuemeka.aladum@outsourceglobal.net","evans.kwaghzer@outsourceglobal.net","enitan.olabamidele@outsourceglobal.net"],
      "team_members": ["Uchenna.Zulike@outsourceglobal.net","emmanuel.ikechukwu@outsourceglobal.net","richard.akagha@outsourceglobal.net","emmanuel.akor@outsourceglobal.net","bokat.simon@outsourceglobal.net","king.chinedu@outsourceglobal.net","nneoma.okocha@outsourceglobal.net","faith.jimoh@outsourceglobal.net","praise.ndudi@outsourceglobal.net","olushola.bolodeoku@outsourceglobal.net","favour.anosike@outsourceglobal.net","young.ogbe-edah@outsourceglobal.net","melody.nkut@outsourceglobal.net","lydia.bulus@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Cs Live 2",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "15:30",
      "shift_end": "23:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 15,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["shadrach.yissa@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["seyi.adekoya@outsourceglobal.net","parkwat.theophilus@outsourceglobal.net","chukwuemeka.aladum@outsourceglobal.net","evans.kwaghzer@outsourceglobal.netenitan.olabamidele@outsourceglobal.net",""],
      "team_members": ["ibrahim.abdulwahab@outsourceglobal.net","oloja.ene@outsourceglobal.net","asan.bernard@outsourceglobal.net","hassan.aisha@outsourceglobal.net","obiokor.miracle@outsourceglobal.net","okeke.stephanie@outsourceglobal.net","erinayo.john@outsourceglobal.net","emeka.ewenike@outsourceglobal.net","mohammed.lawal@outsourceglobal.net","tracy.peter@outsourceglobal.net","ambi.solomon@outsourceglobal.net","oreoluwa.seun@outsourceglobal.net","rachael.udoh@outsourceglobal.net","charles.chikwado@outsourceglobal.net","anebi.onuh@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Cs Appeals",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 7,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["shadrach.yissa@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["aisha.usman@outsourceglobal.net"],
      "team_members": ["augusta.ihejirika@outsourceglobal.net","lydia.anuka@outsourceglobal.net","erhumose.osagie@outsourceglobal.net","sharua.maria@outsourceglobal.net","joyce.jonathan@outsourceglobal.net","winnifred.aminu@outsourceglobal.net"]
    },
    {
      "Campaign_name": "CS Docs 1",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "11:00",
      "shift_end": "18:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 3,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["hilda.opiah@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["Yusuf.Mohammed@outsourceglobal.net","susan.lar@outsourceglobal.net","godwin.ojobo@outsourceglobal.net"]
    },
    {
      "Campaign_name": "CS Docs 2",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "14:30",
      "shift_end": "22:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 13,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["hilda.opiah@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["joseph.oluwashola@outsourceglobal.net","omuchu.salihu@outsourceglobal.net","felix.ushie@outsourceglobal.net","jude.ikechukwu@outsourceglobal.net","george.samuel@outsourceglobal.net","abigail.elawore@outsourceglobal.net","micheal.shokunbi@outsourceglobal.net","emmanuel.omale@outsourceglobal.net","collins.mark@outsourceglobal.net","chapola.mshelia@outsourceglobal.net","bello.misbahu@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Fin Ops",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "14:30",
      "shift_end": "22:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["hilda.opiah@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["winifred.obika@outsourceglobal.net","tina.napken@outsourceglobal.net","cassandra.taiwo@outsourceglobal.net","david.abaisor@outsourceglobal.net","godiva.otubu@outsourceglobal.net","ekpe.theresa@outsourceglobal.net","chinedu-joseph@outsourceglobal.net","opeyemi.yusuf@outsourceglobal.net","obinna.edom@outsourceglobal.net"]
    },
    {
      "Campaign_name": "EMR",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 21,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": ["christabel.okoro@outsourceglobal.net"],
      "team_leads": ["abigail.olumuyiwa@outsourceglobal.net","johsua.ibrahim@outsourceglobal.net","jessica.youmu@outsourceglobal.net"],
      "team_members": ["abigail.emmanual@outsourceglobal.net","kingsley.okafor@outsourceglobal.net","maureen.obiekwe@outsourceglobal.net","virtue.michael@outsourceglobal.net","thelma.manga@outsourceglobal.net","love.daniel@outsourceglobal.net","eti.enyong@outsourceglobal.net","bernard.justina@outsourceglobal.net","nduka.chinaza@outsourceglobal.net","grace.edeh@outsourceglobal.net","mercy.akpan@outsourceglobal.net","wisdom.amaso@outsourceglobal.net","dammi.makama@outsourceglobal.net","dorcas.bala@outsourceglobal.net","rayan.adeola@outsourceglobal.net","pamela.okojie@outsourceglobal.net","agbo.alice@outsourceglobal.net"]
    },
    {
      "Campaign_name": "MR Follow-Up",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 32,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["john.ogar@outsourceglobal.net"],
      "quality_analyst": ["priscilla.okpara@outsourceglobal.net","shonubi.damilare@outsourceglobal.net","ogbeche.theodore@outsourceglobal.net"],
      "team_leads": ["deborah.atomode@outsourceglobal.net","chinelo.uzowuru@outsourceglobal.net","nnamuah.onyeoma@outsourceglobal.net"],
      "team_members": ["jajara.shuaibu@outsourceglobal.net","bridget.agah@outsourceglobal.net","andrew.amana@outsourceglobal.net","christopher.onah@outsourceglobal.net","jeremiah.onoja@outsourceglobal.net","akinpelu.adetoro@outsourceglobal.net","kathryn.kuhlman@outsourceglobal.net","andre.oni@outsourceglobal.net","dorcas.okoro@outsourceglobal.net","nnadi.miracle@outsourceglobal.net","abraham.abba@outsourceglobal.net","adejoke.miracle@outsourceglobal.net","melody.amechi@outsourceglobal.net","sandra.onyekwere@outsourceglobal.net","bliss.iIkpade@outsourceglobal.net","louisa.gunning@outsourceglobal.net","christopher.ibezim@outsourceglobal.net","lawrence.okechukwu@outsourceglobal.net","itunuayomi.kayode@outsourceglobal.net","blessing.akpan@outsourceglobal.net","queen.akomolafe@outsourceglobal.net","cynthia.nwakor@outsourceglobal.net","kingsley.ogbuehi@outsourceglobal.net","isaac.idoko@outsourceglobal.net","fanan.yashi@outsourceglobal.net","nkata.chigozie@outsourceglobal.net","chiagozie.onwubuche@outsourceglobal.net","erica.umeh@outsourceglobal.net","richard.agwu@outsourceglobal.net","joashua.aguebor@outsourceglobal.net"]
    },
    {
      "Campaign_name": "MR Renaming",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 8,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["john.ogar@outsourceglobal.net"],
      "quality_analyst": ["suleiman.buba@outsourceglobal.net"],
      "team_leads": ["winner.akpojotor@outsourceglobal.net"],
      "team_members": ["benshak.dayohom@outsourceglobal.net","stephanie.modupe@outsourceglobal.net","saheed.lawal@outsourceglobal.net","olofin.mobola@outsourceglobal.net","ephraim.deoseida@outsourceglobal.net","victor.bamidele@outsourceglobal.net","shehu.yusuf@outsourceglobal.net","chigozie.okoye@outsourceglobal.net"]
    },
    {
      "Campaign_name": "MR Pre-Audit",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["john.ogar@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["valentine.ikegbunam@outsourceglobal.net"],
      "team_members": ["mavis.ononiwu@outsourceglobal.net","jennifer.udenkwo@outsourceglobal.net","herman.okpara@outsourceglobal.net","sherifat.yahaya@outsourceglobal.net","elijah.gwadia@outsourceglobal.net","jessica.nwokocha@outsourceglobal.net","pam.yop@outsourceglobal.net"] },
    {
      "Campaign_name": "MR Invoice",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 5,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["john.ogar@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["bariat.madaki@outsourceglobal.net"],
      "team_members": ["OLADAYO.ADEKOYA@outsourceglobal.net","igbekele.samuel@outsourceglobal.net","ayodeji.emmanuel@outsourceglobal.net","precious.madugu@outsourceglobal.net","mark.olajide@outsourceglobal.net"]
     },
    {
      "Campaign_name": "MR Admin",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 5,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["john.ogar@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["otobong.wilson@outsourceglobal.net"],
      "team_members": ["saanmoiyol.lyortyom@outsourceglobal.net","stephanie.asegieme@outsourceglobal.net","gabriel.olawale@outsourceglobal.net","patience.audi@outsourceglobal.net","laven.ponjul@outsourceglobal.net"] 
   },
    {
      "Campaign_name": "Intake",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "14:30",
      "shift_end": "0:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 22,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["daniel.king@outsourceglobal.net"],
      "quality_analyst": ["david.umoh@outsourceglobal.net"],
      "team_leads": ["micheal.effiong@outsourceglobal.net","bello.zainab@outsourceglobal.net","david.helper@outsourceglobal.net"],
      "team_members":[ "mordi.deborah@outsourceglobal.net","ekah.benjamin@outsourceglobal.net","ebido.mariebennie@outsourceglobal.net","sanusi.Hassan@outsourceglobal.net","samson.solomon@outsourceglobal.net","kim.davou@outsourceglobal.net","faith.ushie@outsourceglobal.net","gloria.omoleye@outsourceglobal.net","kim.bature@outsourceglobal.net","richards.jannifer@outsourceglobal.net","stephen.peace@outsourceglobal.net","samuel.adeyongov@outsourceglobal.com,samiyat.abdulmalik@outsourceglobal.net","adams.cynthia@outsourceglobal.net","glory.adukwu@outsourceglobal.net","ene.christiana@outsourceglobal.net","abdulhakam.lawal@outsourceglobal.net"]
   },
    {
      "Campaign_name": "Health & Wellness",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "14:30",
      "shift_end": "23:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 88,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["peace.akpan@outsourceglobal.net"],
      "quality_analyst": ["thelma.enyowhara@outsourceglobal.net","prince.ugo@outsourceglobal.net","prince.john@outsourceglobal.net","dominic.ogwudu@outsourceglobal.net","cynthia.ogbonna@outsourceglobal.net","ifunanya.eriama@outsourceglobal.net"],
      "team_leads":[ "jordan.isoken@outsourceglobal.net","joy.emeribe@outsourceglobal.net","Victor.Owunnah@outsourceglobal.net","rabiat.tijani@outsourceglobal.net","nicholas.oshioma@outsourceglobal.net"],
      "team_members": ["emmanuel.onwegbuzie@outsourceglobal.net","mary.okwuobi@outsourceglobal.net",",ajuma.sani@outsourceglobal.net",",abdullahi.oyiza@outsourceglobal.net","ogbonda.victor@outsourceglobal.net","udeh.honeybell@outsourceglobal.net","madu.onyekachi@outsourceglobal.net","maranatha.emmanuel@outsourceglobal.net","muhammad.awwal@outsourceglobal.net","victor.soronnadi@outsourceglobal.net","josiah.zaky@outsourceglobal.net","danok.faith@outsourceglobal.net","edevo.jenny@outsourceglobal.net","gabriel.adams@outsourceglobal.net","baron.obiaeli@outsourceglobal.net","george.sydney@outsourceglobal.net","konye.odali@outsourceglobal.net","sandra.akudo@outsourceglobal.net","nathan.vongrim@outsourceglobal.net","sarah.awele@outsourceglobal.net","maryam.abdulkadir@outsourceglobal.net","augustina.adati@outsourceglobal.net","deborah.joseph@outsourceglobal.net","rosemary.augustine@outsourceglobal.net","joseph.ogenyi@outsourceglobal.net","yetunde.tiemi@outsourceglobal.net","comfort.abuh@outsourceglobal.net","folorunso.eniola@outsourceglobal.net","joy.olu-benson@outsourceglobal.net","alpha.yamusa@outsourceglobal.net","susan.ojiabor@outsourceglobal.net","dieno.esielle@outsourceglobal.net","christian.isah@outsourceglobal.net","khairat.aliyu@outsourceglobal.net","ufuoma.mudiare@outsourceglobal.net","malachi.nwokocha@outsourceglobal.net","christopher.shaibu@outsourceglobal.net","rose.ejim@outsourceglobal.net","chukwuebuka.oguejiofor@outsourceglobal.net","grace.moses@outsourceglobal.net","merit.anyaogu@outsourceglobal.net","roselyne.lawrence@outsourceglobal.net","kelly.bassey@outsourceglobal.net","sandra.ogbodo@outsourceglobal.net","emmanuel.ehighalua@outsourceglobal.net","joshua.daniels@outsourceglobal.net","gloria.ujoh@outsourceglobal.net","priscillia.oduh@outsourceglobal.net","oluwatosin.aremu@outsourceglobal.net","patricia.ogbeche@outsourceglobal.net","happiness.ezewele@outsourceglobal.net","chinyere.ebosie@outsourceglobal.net","paul.ekpo@outsourceglobal.net","nnannna.kalu@outsourceglobal.net","becky.amego@outsourceglobal.net","onyinye.nwanmadi@outsourceglobal.net","john.udoka@outsourceglobal.net","joy.awo@outsourceglobal.net","khalifa.abubakar@outsourceglobal.net","olimah.peter@outsourceglobal.net","emmanuel.stephen@outsourceglobal.net","kelly.oyalura@outsourceglobal.net","bukola.shina@outsourceglobal.net","esther.zekeri@outsourceglobal.net","wisdom.ekene@outsourceglobal.net","goodness.kachidi@outsourceglobal.net","mavis.jangali@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Canvassing",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "13:30",
      "shift_end": "22:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 6,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["igwe.paul@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["okiribit.ayobami@outsourceglobal.net","egbuche.jennifer@outsourceglobal.net","obande.king@outsourceglobal.net","akagworo.gloria@outsourceglobal.net","iniobong.amanam@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Legal",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "09:00",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 56,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["chiroma.abba@outsourceglobal.net","ufuoma.ovwasa@outsourceglobal.net","mary.anwana@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["lydia.abimbola@outsourceglobal.net","ngozi.okonkwo@outsourceglobal.net","deborah.eke@outsourceglobal.net","musa.ahmed@outsourceglobal.net","taiwo.aladejana@outsourceglobal.net"],
      "team_members": ["anthony.ime@outsourceglobal.net","morgan.lekwa@outsourceglobal.net","Queen.Essien@outsourceglobal.net","victoria.danefebo@outsourceglobal.net","aimalohi.ejere@outsourceglobal.net","Keran.Danjan@outsourceglobal.net","anthony.ogunor@outsourceglobal.net","chisom.onyema@outsourceglobal.net","ajani.zainab@outsourceglobal.net","queenette.effiom@outsourceglobal.net","imelda.essien@outsourceglobal.net","musa.ahmed@outsourceglobal.net","ayorinde.aminu@outsourceglobal.net","nanfe.fadip-miri@outsourceglobal.net","faith.monokpo@outsourceglobal.net","Inyeneobong.Udo@outsourceglobal.net","anietie.ituen@outsourceglobal.net","mary-joy.sampson@outsourceglobal.net","grace.atane@outsourceglobal.net","Callistus.Aneke@outsourceglobal.net","ezinne.duruji@outsourceglobal.net","bernard.emecheta@outsourceglobal.net","Hadiza.Sidiq@outsourceglobal.net","agnes.nzor@outsourceglobal.net","taiwo.aladejana@outsourceglobal.net","Chukwuka.Chibuogwu@outsourceglobal.net","chigozie.nwoke@outsporceglobal.net","Nneamaka.Ehumadu@outsourceglobal.net","ikpeme.esther@outsourceglobal.net","Farida.Audu@outsourceglobal.net","enya.echeng@outsourceglobal.net","Ikedi.Onyezubelu@outsourceglobal.net","hadiza.obaje@outsourceglobal.net","stephen.uyai@outsourceglobal.net","jonga.yusuf@outsourceglobal.net","oluchukwu.nwachukwu@outsourceglobal.net","hilda.obule@outsourceglobal.net","olomotane.egoro@outsourceglobal.net","manasseh.agye@outsourceglobal.net","suleiman.nana@outsourceglobal.net","rose.akor@outsourceglobal.net","justina.okabo@outsourceglobal.net","emma-obi.chukwugozie@outsourceglobal.net","lawal.rukayat@outsourceglobal.net","rosemary.uko@outsourceglobal.net","imaobong.inyang@outsourceglobal.net","adaobi.nwabuoku@outsourceglobal.net","justine.ugbe@outsourceglobal.net","ntami.eborty@outsourceglobal.net","christiana.adebisi@outsourceglobal.net",""
    ]},
    {
      "Campaign_name": "Mailroom",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "12:00",
      "shift_end": "20:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 6,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["salamatu.isa@outsourceglobal.net"],
      "team_members": ["deborah.dinnah@outsourceglobal.net","hope.chima@outsourceglobal.net","olumba.anastecia@outsourceglobal.net","cornelius.ogah@outsourceglobal.net","desmond.adah@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "My Self Health",
      "client": "61fdae412f64dcd8b868ea0f",
      "type": "foreign",
      "objectives": "",
      "shift_start": "14:30",
      "shift_end": "22:30",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 2,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["ihejirika.nnenna@outsourceglobal.net","jennifer.onegbu@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Lead Generation",
      "client": "61fdae412f64dcd8b868ea10",
      "type": "domestic",
      "objectives": "",
      "shift_start": "08:30",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 4,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["jemima.jenfa@outsourceglobal.net","joylyn.nyada@outsourceglobal.net","mundung.weng@outsourceglobal.net","paul.kachiro@outsourceglobal.net"
   ] },
    {
      "Campaign_name": "Legend 1",
      "client": "61fdae412f64dcd8b868ea11",
      "type": "domestic",
      "objectives": "",
      "shift_start": "08:00",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["ameloko.innocent@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["nwachukwu.david@outsourceglobal.net"],
      "team_members": ["okpoko.angela@outsourceglobal.net","peter.efemena@outsourceglobal.net","imelda.akogu@outsourceglobal.net","pedro.joyce@outsourceglobal.net","oraiku.paul@outsourceglobal.net","jamila.isa@outsourceglobal.net","freeman.ayis@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Legend 2",
      "client": "61fdae412f64dcd8b868ea11",
      "type": "domestic",
      "objectives": "",
      "shift_start": "12:00",
      "shift_end": "21:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "external",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["ameloko.innocent@outsourceglobal.net"],
      "quality_analyst": [],
      "team_leads": ["nwachukwu.david@outsourceglobal.net"],
      "team_members": ["okpoko.angela@outsourceglobal.net","peter.efemena@outsourceglobal.net","imelda.akogu@outsourceglobal.net","pedro.joyce@outsourceglobal.net","oraiku.paul@outsourceglobal.net","jamila.isa@outsourceglobal.net","freeman.ayis@outsourceglobal.net"
   ] },
    {
      "Campaign_name": "Sterling Bank",
      "client": "61fdae412f64dcd8b868ea12",
      "type": "domestic",
      "objectives": "",
      "shift_start": "08:30",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 52,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["winifred.izims@outsourceglobal.com"],
      "quality_analyst": ["sophia.ughara@outsourceglobal.net"],
      "team_leads": ["evelyn.etemah@outsourceglobal.net","ajidueh.princewill@outsourceglobal.net","audu.hadiza@outsourceglobal.net"],
      "team_members": ["amos.uchenna@outsourceglobal.net","james.ogbu@outsourceglobal.net","nworgu.adanne@outsourceglobal.net","nanbal.dayen@outsourceglobal.net","nnaji.christiana@outsourceglobal.net","adeyemo.solomon@outsourceglobal.net","promise.emenike@outsourceglobal.net","abubakar.yakassai@outsourceglobal.net","musa.abba@outsourceglobal.net","bamidele.olajumoke@outsourceglobal.net","abdulhakeem.zainab@outsourceglobal.net","ezugwu.jude@outsourceglobal.net","uriem.gracious@outsourceglobal.net","justina.anazia@outsourceglobal.net","ogwuche.simon@outsourceglobal.net","ogbuka.gladys@outsourceglobal.net","akonjie.perpetual@outsourceglobal.net","victory.isichei@outsourceglobal.net","agbadu.oyanki@outsourceglobal.net","patrick.benjamin@outsourceglobal.net","njoku.stanley@outsourceglobal.net","maryann.chukwujekwu@outsourceglobal.net","fatima.muhammed@outsourceglobal.net","mercy.godwin@outsourceglobal.net","etom.okoi@outsourceglobal.net","hadi.gambo@outsourceglobal.net","chimbiko.jane@outsourceglobal.net","ohonbamu.gladys@outsourceglobal.net","emmanuel.eboh@outsourceglobal.net","christian.nwaogu @outsourceglobal.net","eunice.paul@outsourceglobal.net","joy.omenogor@outsourceglobal.net","judith.agazie@outsourceglobal.net","anthony.nebo@outsourceglobal.net","juliet.onah@outsourceglobal.net","akinyera.afusat@outsourceglobal.net","grace.fakrogha@outsourceglobal.net","ajayi.seun@outsourceglobal.net","comfort.dauda@outsourceglobal.net","ezama.efosa@outsourceglobal.net","patricia.ogbeche@outsourceglobal.net","sumaiyah.abubakar@outsourceglobal.net","joseph.idoko@outsourceglobal.net","george.anyamutaku@outsourceglobal.net","chidera.asogwa@outsourceglobal.net","aliyu.shamaki@outsourceglobal.net","akanbi.oluwafunmilayo@outsourceglobal.net","dolapo.adesina@outsourceglobal.net","jonathan.kuzhe@outsourceglobal.net","maimuna.bagudu@outsourceglobal.net","arinze.jennifer@outsourceglobal.net","james.nwachukwu@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Unilever",
      "client": "61fdae412f64dcd8b868ea13",
      "type": "domestic",
      "objectives": "",
      "shift_start": "08:30",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["fred.eke@outsourceglobal.com"],
      "team_members": ["mercy.nkem@outsourceglobal.net","patience.adebayo@outsourceglobal.net","opara.emmanuella@outsourceglobal.net","chinedu.francis@outsourceglobal.net","mary.chukwu@outsourceglobal.net",",,florence.meshubi@outsourceglobal.net","mary.adeleye@outsourceglobal.com,divine.ajachukwu@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Parkway 1",
      "client": "61fdae412f64dcd8b868ea14",
      "type": "domestic",
      "objectives": "",
      "shift_start": "07:00",
      "shift_end": "16:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["emmanel.onyebuchi@outsourceglobal.net"],
      "team_members": ["tijani.obejara@outsourceglobal.net","bassey.praise@outsourceglobal.net","uchemefuna.martha@outsourceglobal.net","emmanuel.david@outsourceglobal.com,alaoma.nkechiyere@outsourceglobal.net","anita.damang@outsourceglobal.net","charles.odia@outsourceglobal.net","alex.akinbamini@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Parkway 2",
      "client": "61fdae412f64dcd8b868ea14",
      "type": "domestic",
      "objectives": "",
      "shift_start": "09:00",
      "shift_end": "18:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["emmanel.onyebuchi@outsourceglobal.net"],
      "team_members": ["tijani.obejara@outsourceglobal.net","bassey.praise@outsourceglobal.net","uchemefuna.martha@outsourceglobal.net","emmanuel.david@outsourceglobal.com,alaoma.nkechiyere@outsourceglobal.net","anita.damang@outsourceglobal.net","charles.odia@outsourceglobal.net","alex.akinbamini@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Parkway 3",
      "client": "61fdae412f64dcd8b868ea14",
      "type": "domestic",
      "objectives": "",
      "shift_start": "14:00",
      "shift_end": "23:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["emmanel.onyebuchi@outsourceglobal.net"],
      "team_members": ["tijani.obejara@outsourceglobal.net","bassey.praise@outsourceglobal.net","uchemefuna.martha@outsourceglobal.net","emmanuel.david@outsourceglobal.com,alaoma.nkechiyere@outsourceglobal.net","anita.damang@outsourceglobal.net","charles.odia@outsourceglobal.net","alex.akinbamini@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Paystack",
      "client": "61fdae412f64dcd8b868ea15",
      "type": "domestic",
      "objectives": "",
      "shift_start": "08:30",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 27,
      "diallers": "inhouse",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": ["linda.maisamari@outsourceglobal.com"],
      "quality_analyst": ["chisom.orah@outsourceglobal.net"],
      "team_leads": ["daniels.futsainom@outsourceglobal.net","atariofe.kpemi@outsourceglobal.net"],
      "team_members": ["evelyn.egba@outsourceglobal.net","arayi.joy@outsourceglobal.net","ali.ne@outsourceglobal.net","ophe.ella@outsourceglobal.net","gbenga.adeyemi@outsourceglobal.net","umoh.mfon@outsourceglobal.net","usulor.abuchi@outsourceglobal.net","raimi.abass@outsourceglobal.net","collins.chidera@outsourceglobal.net","joy.jonah@outsourceglobal.net","christiana.ochuwa@outsourceglobal.net","israel.murna@outsourceglobal.net","blessing.nike@outsourceglobal.net","babatunde.augustine@outsourceglobal.net","ojogbane.richard@outsourceglobal.net","ruth.oche@outsourceglobal.net","jude.okosun@outsourceglobal.net","daniels.michelle@outsourceglobal.net","oladele.morenike@outsourceglobal.net","ruth.kurah@outsourceglobal.net","linda.chizoba@outsourceglobal.net","michael.salaki@outsourceglobal.net",",abubakar.abdulganiy@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Gomoney1",
      "client": "61fdae412f64dcd8b868ea16",
      "type": "domestic",
      "objectives": "",
      "shift_start": "07:00",
      "shift_end": "16:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "others",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["grace.danok@outsourceglobal.net"],
      "team_members": ["laura.ononiwu@outsourceglobal.net","enuanwa.ruth@outsourceglobal.net","oluwadoyin.azeez@outsourceglobal.net","balami.barka@outsourceglobal.net","fatima.kabiru@outsourceglobal.net","chizoba.nwakuba@outsourceglobal.net","vivian.mokwenye@outsourceglobal.net","emmanuel.jagaba@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Gomoney2",
      "client": "61fdae412f64dcd8b868ea16",
      "type": "domestic",
      "objectives": "",
      "shift_start": "12:00",
      "shift_end": "21:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 9,
      "diallers": "others",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["grace.danok@outsourceglobal.net"],
      "team_members": ["laura.ononiwu@outsourceglobal.net","enuanwa.ruth@outsourceglobal.net","oluwadoyin.azeez@outsourceglobal.net","balami.barka@outsourceglobal.net","fatima.kabiru@outsourceglobal.net","chizoba.nwakuba@outsourceglobal.net","vivian.mokwenye@outsourceglobal.net","emmanuel.jagaba@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "Sloane&CO",
      "client": "61fdae412f64dcd8b868ea17",
      "type": "foreign",
      "objectives": "",
      "shift_start": "09:00",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 1,
      "diallers": "others",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["bernice.omaidu@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Raven&Macaw",
      "client": "61fdae412f64dcd8b868ea18",
      "type": "foreign",
      "objectives": "",
      "shift_start": "09:00",
      "shift_end": "17:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 1,
      "diallers": "others",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": ["jessica.dimunah@outsourceglobal.net"]
    },
    {
      "Campaign_name": "Software Developers",
      "client": "61fdae412f64dcd8b868ea10",
      "type": "domestic",
      "objectives": "",
      "shift_start": "",
      "shift_end": "",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 22,
      "diallers": "others",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": ["akinade.tumise@outsourceglobal.com,abubakar.abdulwahab@outsourceglobal.com,abdulraheem.sherif@outsourceglobal.com,abubakar.sadiq@outsourceglobal.net"],
      "team_members": ["oyindamola.oyetunmibi@outsourceglobal.com,nnamdi.ogundu@outsourceglobal.com,ahmed.dambatta@outsourceglobal.net","iman.wada@outsourceglobal.com,praise.wisdom@outsourceglobal.com,momoh.nobert@outsourceglobal.net","anthony.anonde@outsourceglobal.net","ibrahim.bashir@outsourceglobal.com,maryam.muhammed@outsourceglobal.net","abeeb.adesoye@outsourceglobal.com,nuuman.turaki@outsourceglobal.net","dominic.ugbana@outsourceglobal.com,yahya.bindir@outsourceglobal.com,mathia.obed@outsourceglobal.net","chima.ekeneme@outsourceglobal.net","abdulhakeem.abdulaleem@outsourceglobal.net","ahmed.bello@outsourceglobal.net","anthony.ime@outsourceglobal.net"
    ]},
    {
      "Campaign_name": "CBN",
      "client": "61fdae412f64dcd8b868ea19",
      "type": "domestic",
      "objectives": "",
      "shift_start": "09:01",
      "shift_end": "18:00",
      "start_date": "",
      "end_date": "",
      "number_of_employees": 23,
      "diallers": "",
      "billing_structure": "",
      "status": "approved",
      "Supervisors": [],
      "quality_analyst": [],
      "team_leads": [],
      "team_members": []
    }
   ]
   


class ProjectService {
    public project: any;
    public employee: any;
    public role: any;

    constructor() {
        this.project = projectModel;
        this.employee = EmployeeModel;
        this.role = RoleModel;
    }


    public async findTL() {
        const getIds = (arr) => arr.map(e => e._id)
        try {
            for (let i = 0; i < projectList.length; i++) {
                const tl = projectList[i].team_leads;
                const tm = projectList[i].team_members;
                const sup = projectList[i].Supervisors;
                const qa = projectList[i].quality_analyst;
                const tlrecords = await this.employee.find({ 'company_email': { $in: tl } });
                const tmrecords = await this.employee.find({ 'company_email': { $in: tm } });
                const suprecord = await this.employee.find({ 'company_email': { $in: sup } });
                const qarecord = await this.employee.find({ 'company_email': { $in: qa } });
                const updateProject: IProject = await this.project.findOneAndUpdate(
                    { project_name: projectList[i].Campaign_name },
                    { $set: { 
                        team_members: getIds(tmrecords),
                        team_leads: getIds(tlrecords), 
                        supervisor: getIds(suprecord), 
                        quality_analyst: getIds(qarecord)

                      } },
                    {new: true}
                  ).exec();
                console.log(updateProject);
            }
        } catch (error) {
            console.log(error);
        }
    }
    public async findAll(param: any = {}): Promise<IProject[]> {
        const projects: IProject[] = await this.project.find(param).populate("manager quality_analyst client_id creator team_leads").populate({ 
            path: 'team_members',
            populate: {
              path: 'designation',
              model: 'Designation'
            } 
         });
        return projects;
    }

    public async find(projectId: string): Promise<IProject> {
        if (isEmpty(projectId)) throw new HttpException(400, "Missing Id Params");
        const findproject = this.findOne(projectId);
        if (!findproject) throw new HttpException(409, "Project not found");
        return findproject;
    }

    public async create(Payload: CreateProjectDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const data = {
            ...Payload,
            slug: slugify(Payload.project_name)
        }
        const newProject: IProject = await this.project.create(data);
        return newProject;
    }
    public async createBulk() {
        const projects = projectList.map(e => {
            return {
                ...e,
                slug: slugify(e.project_name)
            }
        })
        await this.project.create(projects)

    }

    public async update(projectId: string, Payload: UpdateProjectDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findproject = this.findOne(projectId);
        if (!findproject) throw new HttpException(409, "Project not found");
        const updateProject: IProject = await this.project.findByIdAndUpdate(projectId, Payload, {new: true});
        return updateProject;
    }

    public async updateTeamLead(projectId: string, Payload: UpdateTeamLeadDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const team_leads = await Payload.team_leads
        const updateProject: IProject = await this.project.findOneAndUpdate(
            { _id: projectId },
            { $addToSet: { team_leads: {$each: team_leads } } },
            {new: true}
          ).exec();
        return updateProject;
    }

    public async removeTeamLead(projectId: string, Payload: UpdateTeamLeadDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const team_leads = await Payload.team_leads
        const updateProject: IProject = await this.project.update(
            { _id: projectId },
            { $pull: { team_leads: { $in: team_leads } } },
            { multi: true }
          ).exec();
        return updateProject;
    }

    public async updateTeamMember(projectId: string, Payload: UpdateTeamMembersDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const team_members = await Payload.team_members
        const updateProject: IProject = await this.project.findOneAndUpdate(
            { _id: projectId },
            { $addToSet: { team_members: {$each: team_members } } },
            {new: true}
          ).exec();
        return updateProject;
    }

    public async removeTeamMember(projectId: string, Payload: UpdateTeamMembersDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const team_members = await Payload.team_members
        const updateProject: IProject = await this.project.update(
            { _id: projectId },
            { $pull: { team_members: { $in: team_members } } },
            { multi: true }
          ).exec();
        return updateProject;
    }

    public async approve(projectId: string, Payload: ApproveProjectDto): Promise<IProject> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findproject = this.findOne(projectId);
        if (!findproject) throw new HttpException(409, "Project not found");
        const updateProject: IProject = await this.project.findByIdAndUpdate(projectId, Payload, {new: true});
        if(updateProject.status === "approved"){
            const getRoles: IRole = await this.role.find().select('_id')
            const params = {
                role_id: {
                    "$in": getRoles
                }
            }
            const getEmployeeWithRole: Employee = await this.employee.find(params).distinct("company_email")
            console.log(getEmployeeWithRole)
            const emailTemplate = campaignCreationEmail(getEmployeeWithRole, "A new campaign created. do the needful")
            const sclient = await new SocketLabsClient(parseInt(process.env.SOCKETLABS_SERVER_ID), process.env.SOCKETLABS_INJECTION_API_KEY);

            await sclient.send(emailTemplate).then(
                (response) => {
                    console.log(response)
                },
                (err) => {
                    //Handle error making API call
                    console.log(err);
                }
            );
        }
        return updateProject;
    }

    public async delete(projectId: string): Promise<IProject> {
        const drop: IProject = await this.project.findByIdAndDelete(projectId);
        if (!drop) throw new HttpException(409, `${projectId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IProject> {
        const findproject: IProject = await this.project.findOne({ _id: id }).populate("manager quality_analyst client_id creator team_leads").populate({
          path: 'team_members',
          populate: {
            path: 'designation',
            model: 'Designation'
          }
        });
        return findproject;
    }
}

export default ProjectService;
