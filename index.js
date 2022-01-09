import request from 'request';
import cheerio from 'cheerio';
import URL from 'url-parse';
import chalk from 'chalk'

const inputurl = process.argv[2];
// console.log(chalk.hex('#DEADED').bold('Bold gray!'));
console.log(chalk.green("Greetings from"),chalk.green.underline.bold("SOVA_WebCrawler"));
console.log(chalk.hex('#DEADff').bold('Please wait while we are crawling your URL'));
const urlstr = inputurl;
const START_URL = urlstr;
const url = new URL(START_URL);
const allLinks = [];

request(urlstr, cb);

function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
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
            if(href.substring(0,4)!=='http')
            {
                href = "https://"+url.hostname + $(a[i]).attr('href')
            }
            allLinks.push({text:urltext,href:href})
        }
        //console.log( $(a[i]).text(),$(a[i]).attr('href'));
    }
    
    // console.log(allLinks[2]['text']);
    console.log(`${chalk.yellowBright('Domain name of your URL is')} ${chalk.yellow.underline.bold(url.hostname)}`);
    const numoflinks = allLinks.length;
    console.log(`We have found ${numoflinks} on the hmoe page of URL ${inputurl} `);
    for(a of allLinks){
        console.log(a['text'],chalk.hex('#DEADED').bold.underline(a['href']));
    }
    
    console.log(`lenght ${a.length}`);
    // console.log(`lenght b ${b.length}`);
   


}