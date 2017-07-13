import React from 'react'
import styles from './ProductTumb.css'
import {Card, CardTitle, Button} from 'react-materialize'
import Image from '../../../helpers/Image'
class ProductTumb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayedImageIndex: 0
        }
    }

    changePic(event) {
        let direction = (event.target.getAttribute('name'))
        switch (direction) {
            case 'left':
                if (this.state.displayedImageIndex > 0) {
                    let currenIdnex = this.state.displayedImageIndex
                    currenIdnex--
                    this.setState({displayedImageIndex: currenIdnex})
                }
                break;
            case 'right':
                if (this.state.displayedImageIndex < this.props.product.images.length - 1) {
                    let currenIdnex = this.state.displayedImageIndex
                    currenIdnex++
                    this.setState({displayedImageIndex: currenIdnex})
                }
                break;
        }

    }


    render() {
        console.log('render')
        let src = ''
        if (this.props.product.images[this.state.displayedImageIndex]) {
            let urlOptions = '/w_500,h_500,c_fit';
            let lastIndexOf = this.props.product.images[this.state.displayedImageIndex].lastIndexOf('/');
            let firsPart = this.props.product.images[this.state.displayedImageIndex]
                .slice(0, this.props.product.images[this.state.displayedImageIndex]
                    .slice(0, lastIndexOf).lastIndexOf('/'))

            src = [firsPart, urlOptions, this.props.product.images[this.state.displayedImageIndex].slice(lastIndexOf)].join('');
            console.log(src)
        }


        return (
            <div>
                {this.props.productType == "thumb" && (
                    <div className="row">
                        <div className="col-md-9">
                            <Card className='blue-light darken-1'
                                  textClassName='white-text'
                                  title={this.props.product.name}
                                  actions={[<a href='#'>This is a link</a>]}>
                                <h7>Price:{this.props.product.price}</h7>
                                {this.props.product.description}
                            </Card>
                        </div>
                        <div className="col-md-3">
                            {this.props.product.images[0] && (
                                <Image imageType="thumb" src={src}/>
                            )}
                        </div>
                    </div>
                )}
                {this.props.productType == "card" && (
                    <div className="col-md-3">
                        {this.props.product.images.length != 0 && (
                            <div>
                                <div className="changePic picleft" onClick={this.changePic.bind(this)}>
                                    <i name="left" className="material-icons">chevron_left</i>
                                </div>

                                <div className="changePic picRight" onClick={this.changePic.bind(this)}>
                                    <i name="right" className="material-icons">chevron_right</i>
                                </div>
                            </div>
                        )}

                        <Card header={<CardTitle reveal image={src} waves='light'/>}
                              title={this.props.product.name}
                              reveal={<p>{this.props.product.name}</p>}>
                            <div className="col-md6">
                                <h7>Price:{this.props.product.price}</h7>
                            </div>
                            <p><a href="#">This is a link</a></p>
                            <div className="col-md6">
                                <Button onClick={() =>this.props.onAddToBasketClick(this.props.product._id)}
                                        waves='green'>Add to Card</Button>
                                <Button onClick={() =>this.props.onCheckOutClick()}
                                        waves='green'>Add To Card & Checkout</Button>
                            </div>
                        </Card>
                    </div>
                )}


            </div>
        )
    }
}
export default ProductTumb