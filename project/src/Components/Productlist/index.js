import React,{Component} from 'react';
import styles from "./index.scss";
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import axios from "axios";
class ProductList extends Component{
    constructor(props) {
      super(props);
    
      this.state = {
        datalist:[],
        all:[],
        post:[],
        service_label:[],
        show:false,
        dapei:[],
        currentIndex:0,
        isShow:true,
        title:null
      
      };
    }
    componentDidMount(){
        axios.get(`/appapi/product/detail/v3?categoryId=2041204190000004467&productId=${this.props.match.params.id}&platform_code=H5&timestamp=1516062950586&summary=645a4b1c026f9c09fb361f58b7887637`).then(res=>{
                console.log(res.data.infos)
                this.setState({
                    datalist:res.data.infos.images,
                    all:[res.data.infos],
                    post:res.data.infos.product_labels,
                    service_label:res.data.infos.service_labels,
                    title:res.data.infos
                })
        })
       axios.get('/appapi/product/hot/v3?categoryId=2120005100000000380&productId=2040204099000454016&platform_code=H5').then(res=>{

        // console.log(res.data.categoryList)
            this.setState({
                dapei:res.data.categoryList
            })
        })

    }
    render() {
        return (
            <div className={styles.all}>
            <div className={styles.top}><span className={styles.l} onClick={this.gobackClick.bind(this)}>←</span>
            <span className={styles.center}>
            {
                this.state.all.length>0?this.state.all[0].brand:null
                
            }
            </span><span className={styles.r}>…</span></div>
             <div className={styles.swipe1}><ReactSwipe className={styles.carousel} swipeOptions={{continuous: true,auto:2000}} key={this.state.datalist.length}>
                {   

                this.state.datalist.map((item,index)=>
                     <img src={item.smallImgUrl} key={index}/>                   
                    )
             }

             </ReactSwipe></div>
            {
                this.state.all.length>0?
                <div className={styles.top_first}>
                    <h1 className={styles.h11}>{this.state.all[0].name}</h1>
                    <p className={styles.Pnone}><s>￥{this.state.all[0].marketPrice}</s></p>
                    <strong className={styles.left}>￥{this.state.all[0].price}</strong>
                    <ul className={styles.ul1}>
                        {
                            this.state.post.map((item,index)=>
                                <li className={styles.li1} key={index}>{item.label_text}</li>
                                )                       
                        }
                    </ul>
                    <h1 className={styles.h1}>{this.state.all[0].warehouse_name}</h1> <span className={styles.ccc}>{this.state.all[0].deliver_date}</span>
                    <div className={styles.line}></div>
                    <h4 className={styles.shangou}>闪购</h4>
                    <div className={styles.line}></div> 
                    <h4 className={styles.shangou}>服务&nbsp; &nbsp; &nbsp;&nbsp;
                        {   
                            this.state.service_label.map((item,index)=> 
                                <span className={styles.baozhang} key={index}>{item.label_title}</span>                  
                            )
                         }                      
                    </h4>
                    <div className={styles.line}></div> 
                    <div className={styles.chanpin}>商品参数</div>
                    <div className="clear"></div>


                    {
                        this.state.all[0].size.length>0?
                         <h4 className={styles.chichun}>尺码

                        
                         {   
                            this.state.all[0].size.map((item,index)=>   
                                <li  className={this.state.currentIndex==index?'active':'size'} key={index} 
                                onClick={this.sizeClick.bind(this,index)}>{item.sizeLabel}</li>                  
                            )
                         }                      
                     </h4>:null
                    }
                    
                
                    <ul className={styles.attributesList}>
                        {
                           this.state.all[0].description.attributesList.map((item,index)=>
                                <li className={styles.l} key={index}>
                                    <label>{item.name}</label>
                                    <span className={styles.span1}>{item.value}</span>
                                </li>

                            )   
                        }
                        </ul>
                     <div className="clear"></div>
                     <div className={styles.line}></div> 
                    <div className={styles.chanpin}>商品详情</div>

                    <ul className={styles.product_img1}>
                        {
                           this.state.all[0].description.product_img1.map((item,index)=>
                                <li key={index}><img src={item.bigImgUrl} /></li>

                            )   
                        }
                    </ul>   
                    <p className={styles.photoBottom}>图片及相关信息仅供参考,因拍摄灯光及不同显示器色差等问题可能造成商品图片与实物的色差,一切以实物为准</p>

                    
                     {
                     /***/
                        }
                    <div className={styles.tuihuobox}>
                        <p>退货提示:</p>
                        <p>{this.state.all[0].returnNote}</p>
                    </div>

                    <p className={styles.pinpai}>{this.state.all[0].brandName}   <span className={styles.r}>品牌主页</span></p>
                    <div className={styles.pinpaimove}>
                    {   
                        this.state.all[0].brandImg?
                        <div className={styles.brandImg}><img src={this.state.all[0].brandImg} /></div>:null

                    }

                    {
                        this.state.all[0].brand_story&&this.state.isShow?
                    <p onClick={this.handleClick.bind(this)} className={styles.move}>More</p>:null
                    }
                    <div>
                        {
                            this.state.show?
                                <p>{this.state.all[0].brand_story}</p>:null
                        }

                    </div>
                   {
                    /**/
                   } 
                  
                    
                      </div>
                  
                        {
                            this.state.all[0].siloCategory?
                            <ul>
                            <p className={styles.chanpin}>海外直发小贴士 NEW</p>
                                <li>魅力惠海外直发商品非质量问题不支持退货哦。</li>
                                <li className={styles.c6}>海外直发商品，根据海关要求需做入境申报，需要您配合上传身份信息以便及时通关送达。</li>
                                <li className={styles.c6}>海外直发商品均从境外仓发货，预计10-15个工作日送达，请耐心等待，如有疑问，请联系客服，进行订单查询。</li>
                                <li className={styles.c6}>海外直发商品均为魅力惠海外优选，不提供发票，可能无中文标签。</li>
                                <li className={styles.c6}>海外直发商品下单当日，如需取消订单，请联系客服。次日开始，订单无法取消，敬请谅解。</li>
                                <li className={styles.c6}>收到物流公司的被税短信后与物流公司核实并缴税，将缴税凭证发至客服，客服根据缴税凭证金额退款，如有疑问，请联系客服咨询。</li>
                             </ul>:null
                        }   

                         <div className="clear"></div>
                        <div className={styles.line}></div> 
                        <p className={styles.chanpin}>价格说明</p>
                        <p className={styles.c6}>划线价格：为品牌指导价，并非原价；</p>
                        <p className={styles.c6}>未划线价格：为魅力惠实时售价;</p>

                        <div className="clear"></div>
                        <div className={styles.line}></div> 
                        <p className={styles.chanpin}>用户评论 </p>
                          <div className={styles.line}></div> 

                        <p className={styles.chanpin}>搭配推荐</p>
                        <div>
                            <ul className={styles.dapei}>
                        {
                           this.state.dapei.map((item,index)=>
                                <li key={index}>
                                    <img src={item.imgUrl} />
                                    <span>{item.brand_name}</span>
                                    <p><nobr>{item.product_name}</nobr></p>
                                    <span>￥{item.price}</span><span>￥{item.market_price}</span><span>{item.discount}折</span>
                                </li>

                            )   
                        }
                        </ul>


                        </div>




                </div>:null
            }
            
    
            
        </div>
        );
    }
    handleClick(){
        this.setState({
            show:true,
            isShow:false
        })
    }
    sizeClick(index){
        this.setState({
            currentIndex:index
        })
    }
    gobackClick(){
        window.history.back();
    }
}


export default ProductList;