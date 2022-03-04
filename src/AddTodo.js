import React from "react";
import {TextField, Paper, Button, Grid} from "@material-ui/core";

class AddTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {item : {title : ""}};
        this.add = props.add;
    }

    //텍스트를 입력할 때마다 발생하는 이벤트로 onInputChange는 JS 함수이다. 이벤트 핸들러 함수라고 한다.
    onInputChange = (e) =>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value; //target.value에는 사용자 입력한 텍스트가 담겨있다.
        this.setState({item : thisItem}); //setState를 통해서 item을 업데이트해 해당 텍스트를 임시로 저장할 수 있다.
        console.log("addTodo onInputChange  ++ " , e.target.value); 
    }

    onButtonClick = () => {
        this.add(this.state.item);
        this.setState({item : {title : ""}});
        console.log("AddTodo onButtonClick");
    }

    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter'){
            this.onButtonClick();
            console.log("AddTodo enterKeyEventHandler");
        }
    }

    render(){
        return(
            <Paper style={{margin : 16, padding : 16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{paddingRight : 16}}>
                        <TextField 
                            placeholder="Add Todo here" 
                            fullWidth
                            onChange={this.onInputChange}
                            onKeyPress={this.enterKeyEventHandler}
                            defaultValue={this.state.item.title}/>
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button 
                            fullWidth 
                            color = "secondary" 
                            variant="outlined"
                            onClick={this.onButtonClick}>
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;
