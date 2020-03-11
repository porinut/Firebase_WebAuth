'use strict';
const express = require('express');
const url = require('url');
const app = express();
const path = require('path');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require(__dirname+'/key/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-web-auth-e1ba1.firebaseio.com"
});

app.get('/shareBot', (request, response) => {
    var url_parts = url.parse(request.url, true);
    var email = url_parts.query.email;
    var docid = url_parts.query.docid;
    scraping(docid,email);
    response.sendFile(path.join(__dirname+'/views/progress.html'));
});

app.get('/deleteBot', (request, response) => {
    var url_parts = url.parse(request.url, true);
    var email = url_parts.query.email;
    var docid = url_parts.query.docid;
    //scraping(docid,email);
    console.log(email);
    updateStatus(docid,false);
    backward();
    //response.send('DELETE BOT SUCCESS!!')
    //response.sendFile(path.join(__dirname+'/views/progress.html'));
});

exports.app = functions.https.onRequest(app);

/*---------------------------------------------------------------------------------------*/

let db = admin.firestore();

function updateStatus(docid,stat){
    db.collection("users").doc(docid).update({
          status: stat
      }).then(function() {
        console.log(docid+" : updated");
      });   
}

function backward(){
    location.href='home.html';
}


/*---------------------------------------------------------------------------------------*/

const {Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const screen = {
    width: 1920,
    height: 1080
  };
  
var userAdmin = 'onochayama2018@gmail.com';
var pass = 'Onochayama2020';

async function scraping(docid,email) {
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    var timeout = 10000;
    //var driver = new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
    //let driver = new Builder().forBrowser('firefox').build();  
    let driver = new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless().windowSize(screen)).build();
try {
    //await sleep(1500);
    console.log("Open Dialogflow");
    await driver.get('https://dialogflow.com/');
    console.log("Click Signin Button");
    let el = await driver.findElement(By.className("devsite-user-signin button devsite-top-button"));
    await driver.wait(until.elementIsVisible(el),timeout);
    await el.click();

    driver.getTitle().then(function(theText) {
        console.log("Title = " + theText);
    });

    await driver.navigate().forward();  
    var url = '';
    await driver.getCurrentUrl().then(function(theText) {
        console.log("Url = " + theText);
        url = theText
    });
    
    await sleep(2000);
    console.log('Following new url..');
    await driver.get(url);
    driver.getTitle().then(function(theText) {
        console.log("Auth Url Titile  = " + theText);
    });

    console.log('Send key to Email');
    el = await driver.findElement(By.xpath("//*[@id='identifierId']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.sendKeys(userAdmin);
    console.log('Click Next button');
    el = await driver.findElement(By.xpath("//*[@id='identifierNext']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    await sleep(2000);
    console.log('Send key to Password');
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.sendKeys(pass);
    console.log('Click Next button');
    el = await driver.findElement(By.xpath("//*[@id='passwordNext']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(3000);
    //await driver.getCurrentUrl().then(function(theText) {
        //console.log("Url = " + theText);
   // });
    console.log('Click Go to Console button');
    el = await driver.findElement(By.xpath("/html/body/section/devsite-header/div/div[1]/div/div/a"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000);

    console.log('Click Sign in with Google button');
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div/signin/button"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    await driver.navigate().forward(); 
    await sleep(2000); 
    console.log('Following new url..');
    await driver.get(url);
    //driver.getTitle().then(function(theText) {
     //   console.log("Titile = " + theText);
    //});
    await sleep(2000);
    console.log('Click Email button');
    driver.getCurrentUrl().then(function(theText) {
        console.log("URL = " + theText);
    });
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div/div/ul/li[1]/div"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    //await driver.navigate().forward(); 
    await sleep(2000); 
    console.log('Click Go to Console button again');
    el = await driver.findElement(By.className("devsite-header-link devsite-top-button button gc-analytics-event"));
    //el = await driver.findElement(By.xpath("/html/body/section/devsite-header/div/div[1]/div/div/a"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000); 

    console.log("Open Dialogflow Agent");
    driver.navigate().back();
    await sleep(2000); 
    await driver.getCurrentUrl().then(function(theText) {
        console.log("URL = " + theText);
        if(theText !== 'https://dialogflow.cloud.google.com/#/agent/smartvoicecontrol-oxgrnm/intents'){
            driver.navigate().back();
        }
    });
    
    await sleep(2000); 
    console.log("Click setting button");
    el = await driver.findElement(By.xpath("//*[@id='link-settings-agent']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000); 
    console.log("Click share button");
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div[1]/div/div/ul/li[8]"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000); 
    console.log("Send email to invite people");
    el = await driver.findElement(By.name("email"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.sendKeys(email);

    //await sleep(2000); 
    console.log("Click add button");
    el = await driver.findElement(By.css("div.md-secondary-container:nth-child(1) > button:nth-child(1)"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    //await sleep(2000); 
    console.log("Click Save button");
    el = await driver.findElement(By.xpath("//*[@id='multi-button']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000);     

    var list = await driver.findElements(By.className("ng-binding"));
    console.log(list.length);
    await sleep(2000); 
    for (var i = 18; i < list.length; i++) {
         list[i].getText().then(function(text){
                if (text === email) {
                    console.log('Success!!');
                    process.exit(22);
                }
        }
        );
    }
    driver.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('Success.png', image, 'base64', function(err) {
               // console.log(err);
            });
        }
    );
   //updateStatus(docid,true);
   if(list.length!=null){
    updateStatus(docid,true);
    }
    await driver.close();
    console.log('====== > return true');
  } catch (e) {
    //console.log(e);
    driver.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('catchError.png', image, 'base64', function(err) {
                console.log(err);
            });
        }
    );
    console.log('====== > return false');
  }

};


async function scrapingDelete(docid,email) {
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    var timeout = 10000;
    //var driver = new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
    //let driver = new Builder().forBrowser('firefox').build();  
    let driver = new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless().windowSize(screen)).build();
try {
    //await sleep(1500);
    console.log("Open Dialogflow");
    await driver.get('https://dialogflow.com/');
    console.log("Click Signin Button");
    let el = await driver.findElement(By.className("devsite-user-signin button devsite-top-button"));
    await driver.wait(until.elementIsVisible(el),timeout);
    await el.click();

    driver.getTitle().then(function(theText) {
        console.log("Title = " + theText);
    });

    await driver.navigate().forward();  
    var url = '';
    await driver.getCurrentUrl().then(function(theText) {
        console.log("Url = " + theText);
        url = theText
    });
    
    await sleep(2000);
    console.log('Following new url..');
    await driver.get(url);
    driver.getTitle().then(function(theText) {
        console.log("Auth Url Titile  = " + theText);
    });

    console.log('Send key to Email');
    el = await driver.findElement(By.xpath("//*[@id='identifierId']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.sendKeys(userAdmin);
    console.log('Click Next button');
    el = await driver.findElement(By.xpath("//*[@id='identifierNext']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    await sleep(2000);
    console.log('Send key to Password');
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.sendKeys(pass);
    console.log('Click Next button');
    el = await driver.findElement(By.xpath("//*[@id='passwordNext']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(3000);
    //await driver.getCurrentUrl().then(function(theText) {
        //console.log("Url = " + theText);
   // });
    console.log('Click Go to Console button');
    el = await driver.findElement(By.xpath("/html/body/section/devsite-header/div/div[1]/div/div/a"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000);

    console.log('Click Sign in with Google button');
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div/signin/button"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    await driver.navigate().forward(); 
    await sleep(2000); 
    console.log('Following new url..');
    await driver.get(url);
    //driver.getTitle().then(function(theText) {
     //   console.log("Titile = " + theText);
    //});
    await sleep(2000);
    console.log('Click Email button');
    driver.getCurrentUrl().then(function(theText) {
        console.log("URL = " + theText);
    });
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div/div/ul/li[1]/div"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    //await driver.navigate().forward(); 
    await sleep(2000); 
    console.log('Click Go to Console button again');
    el = await driver.findElement(By.className("devsite-header-link devsite-top-button button gc-analytics-event"));
    //el = await driver.findElement(By.xpath("/html/body/section/devsite-header/div/div[1]/div/div/a"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000); 

    console.log("Open Dialogflow Agent");
    driver.navigate().back();
    await sleep(2000); 
    await driver.getCurrentUrl().then(function(theText) {
        console.log("URL = " + theText);
        if(theText !== 'https://dialogflow.cloud.google.com/#/agent/smartvoicecontrol-oxgrnm/intents'){
            driver.navigate().back();
        }
    });
    
    await sleep(2000); 
    console.log("Click setting button");
    el = await driver.findElement(By.xpath("//*[@id='link-settings-agent']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000); 
    console.log("Click share button");
    el = await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div[1]/div/div/ul/li[8]"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(2000); 
   
    //await sleep(2000); 
    //console.log("Click Save button");
    //el = await driver.findElement(By.xpath("//*[@id='multi-button']"));
    //await driver.wait(until.elementIsVisible(el), timeout);
    //await el.click();
    //await sleep(2000);     

    var list = await driver.findElements(By.className("md-no-proxy md-with-secondary ng-scope _md"));
    console.log(list.length);
    await sleep(2000); 
    for (var i = 18; i < list.length; i++) {
         list[i].getText().then(function(text){
                if (text === email) {
                    console.log('Success!!');
                    //process.exit(22);
                }
        }
        );
    }
    driver.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('Success.png', image, 'base64', function(err) {
               // console.log(err);
            });
        }
    );
   //updateStatus(docid,true);
    if(list.length!=null){
        updateStatus(docid,false);
    }
    await driver.close();
    console.log('====== > return false');

   
  } catch (e) {
    //console.log(e);
    driver.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('catchError.png', image, 'base64', function(err) {
                console.log(err);
            });
        }
    );
    console.log('====== > return false');
  }

};

