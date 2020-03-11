'use strict';
const functions = require('firebase-functions');
const express = require('express');
const url = require('url');
const app = express();

app.get('/scraping', (request, response) => {
    var url_parts = url.parse(request.url, true);
    var email = url_parts.query.email;
    scraping(email);
    response.send(email);

})

exports.app = functions.https.onRequest(app);

const {Builder, By, Key, until} = require('selenium-webdriver');
var admin = 'onochayama2018@gmail.com';
var pass = 'onochayama';
// Input capabilities
var capabilities = {
    'browserName' : 'Firefox',
    'browser_version' : '73.0',
    'os' : 'Windows',
    'os_version' : '10',
    'resolution' : '1920x1080',
    'browserstack.user' : 'bsuser64092',
    'browserstack.key' : 'sMqwnaRXpPmX3v34Jzn3',
    'name' : 'Bstack-[Node] Sample Test'
   }

async function scraping(email) {
try {
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    var timeout = 10000;
    var driver = new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
    //let driver = new Builder().forBrowser('firefox').build();  
    await sleep(1500);
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
    await el.sendKeys(admin);
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
    await driver.getCurrentUrl().then(function(theText) {
        console.log("Url = " + theText);
    });
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
    driver.getTitle().then(function(theText) {
        console.log("Titile = " + theText);
    });
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

    await sleep(2000); 
    console.log("Click add button");
    el = await driver.findElement(By.css("div.md-secondary-container:nth-child(1) > button:nth-child(1)"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();

    await sleep(2000); 
    console.log("Click Save button");
    el = await driver.findElement(By.xpath("//*[@id='multi-button']"));
    await driver.wait(until.elementIsVisible(el), timeout);
    await el.click();
    await sleep(3000);                                               

    
  var list = await driver.findElements(By.className('ng-binding'));
    console.log(list.length);
    for (var i = 18; i < list.length; i++) {
        
        list[i].getText().then(function(text){
                console.log(text);
                if (text === email) {
                    console.log('Success!!');
                    process.exit(22);
                }
        }
        );
       
    }

    await driver.close();

  } catch (e) {
    console.log(e);
  }


};

