import request from 'request';
import cheerio from 'cheerio';
import chalk from 'chalk'

const inputurl = process.argv[2];

const allLinks = [];

let urlstr = inputurl;




const gettingDomain = u=>{
    if(u.substring(0,8)=='https://')
    {
        u = u.substring(8);
    }
    if(u.substring(0,7)=='http://')
    {
        u = u.substring(7);
    }
    for(let i = 0; i<u.length;i++)
    {
        if(u[i]=='/')
        {
            u = u.substring(0,i);
            break;
        }
    }
    
    return u;
    
}

console.log(chalk.green("Greetings from"),chalk.green.underline.bold("SOVA_WebCrawler"));
console.log(chalk.hex('#DEADff').bold('Please wait while we are crawling your URL'));
const inputDomain = gettingDomain(inputurl)
urlstr = 'https://'+gettingDomain(urlstr);
request(urlstr, cb);




function cb(error, response, html) {
    if (error) {
        console.error(chalk.red('Error occuured! please enter valid URL or check your internet connection')); // Print the error if one occurred
    } else {
        handlehtml(html);
        // Print the HTML for the Google homepage.
    }
}

function handlehtml(html) {
    let $ = cheerio.load(html);
    let a = $("a");
    //console.log($(a[0]).text());
    for(let i = 0; i<a.length; i++){
        let urltext = $(a[i]).text();
        let href = $(a[i]).attr('href');
        
        if(urltext!="")
        {
            // if(href.substring(0,4)!=='http')
            // {
            //     href = "https://"+url.hostname + $(a[i]).attr('href')
            // }
            allLinks.push({text:urltext,href:href})
        }
        //console.log( $(a[i]).text(),$(a[i]).attr('href'));
    }
    
    // console.log(allLinks[2]['text']);
    console.log(`${chalk.yellowBright('Domain name of your URL is')} ${chalk.yellow.underline.bold(inputDomain)}`);
    const numoflinks = allLinks.length;
    console.log(`We have found ${numoflinks} on the hmoe page of URL ${inputurl} `);
    for(a of allLinks){
        // console.log(`Protocol: ${a['href'].substring(0,5)}`,gettingDomain(inputurl),a['href'].substring(8+inputDomain.length));

        console.log(a['text'],chalk.hex('#DEADED').bold.underline(`${a['href']}`));
    }
       
}