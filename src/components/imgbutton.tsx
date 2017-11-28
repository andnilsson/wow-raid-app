import * as React from 'react'

interface props {
    imgurl: string,
    onClick: () => void,
    style?: any,
    isActive: boolean,
    imgWidth?: number,
    text?: string
}

class ImgButton extends React.Component<props, {}>{
    render(){
        return (
            <div style={this.props.style || {}} className={this.props.isActive ? "imgbutton active": "imgbutton"} onClick={() => this.props.onClick()}>
                {this.props.text || null}
                <img style={{width: this.props.imgWidth || "70px"}} src={this.props.imgurl} />
            </div>
        )
    }
}


export default ImgButton;