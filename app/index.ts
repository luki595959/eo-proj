import * as express from 'express'
import { Router, Request, Response } from 'express'
import * as path from 'path';
import { Application } from 'express'
import * as cors from 'cors'
import {
  auctions,
  global,
  categories,
  organizations,
  participants,
} from './routes'

const app: Application = express()
app.use(cors())

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.get('/aa', async (req: Request, res: Response) => {
  return res.render("landing")
})
app.use(global)
app.use(categories)
app.use(auctions)
app.use(organizations)
app.use(participants)
var PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log("The Server Has Started on Port 8080!")
})

