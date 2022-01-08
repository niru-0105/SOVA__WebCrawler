console.log('hello');
let inputurl = "";
const form = document.querySelector('form')

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    inputurl = document.querySelector('input').value;
    // var sova = document.createElement("a");
    // sova.href= inputurl;
    // console.log(sova.host);
    // // var final = inputurl.hostname
    // // console.log(final);
    console.log(inputurl);
    const domainName = domain(inputurl);
    console.log(domainName);
    if(domainName===false)
    {
        const  dismissdiv = document.querySelector('.dismissdiv')
        const div = document.createElement('div');
        const dismiss = document.createElement('p');
        const crossbtn = document.createElement('button');
        dismiss.append(`URL ${inputurl} is not correct, please enter valid URL`)
        crossbtn.append('Dismiss')
        div.append(dismiss)
        div.append(crossbtn)
        div.classList.add('dismiss')
        dismissdiv.append('beforeend',div)
    }
    else
    {
        const doaminp = document.createElement('p');
        const   dismissdiv = document.querySelector('.dismissdiv')
        doaminp.append(`your URL domain is ${domainName}`)
        doaminp.classList.add('dismiss')
        dismissdiv.append(doaminp);

        console.log(`Domain of your URL id ${domainName}`);
    }
})

const domain = url =>{
    console.log('in domain');
    const len = url.length;
    // console.log(url.substring(len-4));

    // if((url.substring(len-4) !== '.com') || (url.substring(len-3) !=='.in'))
    // {
    //     return false;
    // }
    
    let url1 = url.substring(0,12);
    let url2 = url.substring(0,8);
    let url3 = url.substring(0,4)
    if(url1 == 'https://www.'){

        return url.substring(12);
    }
    if(url2 == 'https://'){

        return url.substring(8);
    }
    if(url3 == 'www.'){

        return url.substring(4);
    }
    return url;
}




