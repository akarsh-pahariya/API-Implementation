import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ip from "ip";

const app=express();
const port=3000;
const API_key="";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res) => {
    res.render("index.ejs");
});

app.get("/knowIP",(req,res) => {
    const ipAddress=ip.address();
    res.render("yourip.ejs",{data:ipAddress});
});

app.get("/ip2location",(req,res) => {
    res.render("ip2location.ejs");
});

app.get("/whois",(req,res) => {
    res.render("whois.ejs");
});

app.post("/info",async(req,res) => {
    const API_URL="https://api.ip2location.io/?key=";
    try {
        const response=await axios.get(API_URL+API_key+"&ip="+req.body.ipAddress);
        const result=response.data;
        console.log(result);
        res.render("ip2location.ejs",{data:result});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.post("/info2",async(req,res) => {
    const API_URL2="https://api.ip2whois.com/v2?key=";
    try {
        const response=await axios.get(API_URL2+API_key+"&domain="+req.body.url);
        const result=response.data;
        console.log(result);
        res.render("whois.ejs",{data:result});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port,() => {
    console.log("Server is running at port "+port);
});
