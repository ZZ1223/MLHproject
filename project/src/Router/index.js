import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Login from '@/Components/Home/Login'
import Register from '@/Components/Home/Register'
import Mycenter from '@/Components/Home/Mycenter'
import Home from '@/Components/Home'
import Top from '@/Components/Home/Top'
import Newarrival from '@/Components/Home/Newarrival'
import Crossborder from '@/Components/Home/Crossborder'
import Women from '@/Components/Home/Women'
import Men from '@/Components/Home/Men'
import Cosmetics from '@/Components/Home/Cosmetics'
import Liftstyle from '@/Components/Home/Liftstyle'
import Kids from '@/Components/Home/Kids'
import Upcoming from '@/Components/Home/Upcoming'
import Product from '@/Components/Product'
import ProductList from '@/Components/ProductList'
import Search from '@/Components/search'
import List from '@/Components/Home/List'
const router=(
	<Router>
		<Home>
			<Switch>

				<Route path="/home/top"  component={Top}/>
				<Route path="/home/newarrival"  component={Newarrival}/>
				<Route path="/home/crossborder" component={Crossborder}/>
				<Route path="/home/women" component={Women}/>
				<Route path="/home/men" component={Men}/>
				<Route path="/home/cosmetics" component={Cosmetics}/>
				<Route path="/home/liftstyle" component={Liftstyle}/>
				<Route path="/home/kids" component={Kids}/>
				<Route path="/home/upcoming" component={Upcoming}/>
				<Route path="/home/search" component={Search}/>				
				<Route path="/product/:id" component={Product} />
				<Route path="/productlist/:id" component={ProductList} />
				<Route path="/list/:id" component={List} />
				<Route path="/login"  component={Login}/>
				<Route path="/register"  component={Register}/>
				<Route path="/mycenter" component={Mycenter}/>
				<Redirect  from="/" to="/home/top"/> 
			</Switch>
		</Home>	
	</Router>
	)

export default router