import React,{Component} from 'react';
import styles from "./index.scss"
import "@/assets/iconfont/iconfont.css"
import {NavLink} from 'react-router-dom'
class Search extends Component{
	constructor(){
		super();
        this.state={
            searchArr:[],
            search:null,
            data:null
        }
	}
    componentDidMount(){
        axios.get("/appapi/search/searchFind/v3").then(res=>{
            this.setState({
                searchArr:res.data.searchFindList,         
            })
            this.listenSearch.bind(this)();  
            this.getStorage.bind(this)(); 
            this.animationSearch.bind(this)();
        })    

    }
	render() {
		return (
			<div>
                <div className={styles.top}>
                    <div className={styles.one}>
                        <span><i className="iconfont icon-search"></i></span>
        				<input type="text" ref="searching"/>
                    </div>
                    <ul>
                        {
                            this.state.data?
                            this.state.data.map(item=>{
                                return(
                                        <li key={item.name} onClick={this.searchFun.bind(this,item.name)}>{item.name}</li>
                                    )
                            }):null
                        }
                    </ul>
                    <div className={styles.two}><a onClick={this.goback.bind(this)}>返回首页</a></div>
                </div>
                <div className="sear">
                <h3>搜索发现</h3>
                <div className={styles.m}>
                    {
                        this.state.searchArr.map((item,index)=>{
                            return(
                                index<6?
                                <span key={item.findKeyWord}  onClick={this.searchFun.bind(this,item.findKeyWord)}>{item.findKeyWord}</span>
                                :null
                            )
                        })
                    }
                </div>
                <h3>历史搜索<span><i onClick={this.deletStorage.bind(this)} className="iconfont icon-delete"></i></span></h3>
                <ul className={styles.history}>
                {
                    this.state.search?
                        this.state.search.map((item,index)=>{
                            return(
                                <h3 key={index} onClick={this.searchFun.bind(this,item)}>{item}</h3>
                            )
                        }):null
                }
                </ul>

                </div>
			</div>
		);
	}
    animationSearch(){
    document.querySelector('input').oninput=()=>{
        axios.get(`/appapi/search/searchSuggest/v3?text=${this.refs.searching.value}`).then(res=>{
            this.setState({
                data:res.data.result
            })
        })
    }
    }
    listenSearch(){
        document.querySelector('input').onkeydown=(event)=>{
        if (event.keyCode == 13){
              if(localStorage.getItem("search")){
                 localStorage.setItem("search",[localStorage.getItem("search"),this.refs.searching.value])
              }else{
                 localStorage.setItem("search",[this.refs.searching.value])
              }
              this.props.history.push(`/list/${this.refs.searching.value}`)            
          }
      } 
    }
    searchFun(value){
        if(localStorage.getItem("search")){
           localStorage.setItem("search",[localStorage.getItem("search"),value])
        }else{
           localStorage.setItem("search",value)
        }
        this.props.history.push(`/list/${value}`)
    }
    getStorage(){
        var arr=[];
        if(localStorage.getItem("search")){
          var localStorageArr=localStorage.getItem("search").split(",");  
        
        for(var i=0;i<localStorageArr.length;i++){
            if(arr.indexOf(localStorageArr[i])==-1){
                arr.push(localStorageArr[i])
            }
        }
         this.setState({
               search: arr
        })

        }

    }
    deletStorage(){
         localStorage.removeItem("search");
         this.setState({
            search:[],
         })
    }


    goback(){
        this.props.history.push(`/home/`)
    }

}

export default Search;