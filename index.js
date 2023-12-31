import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

import 'dotenv/config'


const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('blogapp-c12')
const blogPosts = db.collection('blog-pot')

client.connect()
console.log('Connected to Mongo')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    const allPosts = await blogPosts.find().toArray()
    console.log('allPosts ->', allPosts)
    res.send(allPosts)
})
app.post('/', async (req, res) => {
    console.log('req.body ->', req.body)
    const newBlogPost = { title: req.body.title, content: req.body.content }
    const addedItem = await blogPosts.insertOne(newBlogPost)

    const allPosts = await blogPosts.find().toArray()
    console.log('addedItem ->', addedItem)
    res.send(allPosts)
})

//sign up
app.post('/signup', async(req, res) => {
    const userAdded = await usersDb.insertOne({email: req.body.email, password: req.body.password})
    console.log('user added -> ', userAdded)
    res.send(userAdded)
})

//log in 

app.post('/login',async (req ,res) => {
    console.log(req.body)
    const userFound = await usersDb.findOne({ email: req.body.email })

    res.send(userFound)
})
app.listen('8080', () => console.log('Api listening on port 8080 😎'))