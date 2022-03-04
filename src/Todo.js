import React from "react";
import{ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@material-ui/core"
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component{

    //App.js에서 받은 item 매개변수 넘기기
    constructor(props){
        super(props); //super를 이용하여 props 오브젝트 초기화 
        this.state = {item : props.item, readOnly : true}; //state변수를 item 변수와 props.item으로 초기화한다. readOnly가 true일 경우 수정이 불가상태
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandeler = () => {
        this.delete(this.state.item);
        console.log("todo deleteEventHandeler");
    }

    //title클릭 시 수정 가능하도록 변경하는 함수
    offReadOnlyMode = () =>{
        console.log("수정 이벤트 발생 ", this.state.readOnly);
        this.setState({readOnly : false}, () => {
            console.log("readonly의 상태값 :", this.state.readOnly);
        });
    }

    //title 작성 후 enter키 클릭 시 수정 종료 
    enterKeyEventHandler = (e) =>{
        if(e.key === "Enter"){
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    }

    //title 수정된 내용 저장
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title  = e.target.value;
        this.setState({item : thisItem});
    }

    //체크박스 업데이트
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({item : thisItem});
        this.update(this.state.item);
    }

    //meterial ui 적용
    render(){
        const item = this.state.item;
        return(
            <ListItem>
                <Checkbox 
                    defaultChecked={item.done}
                    onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                        inputProps={{"aria-label" : "naked", readOnly : this.state.readOnly}}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                        type="text"
                        id={item.id}
                        name={item.id}
                        defaultValue={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Default Todo"
                        onClick={this.deleteEventHandeler}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}
 
export default Todo; 