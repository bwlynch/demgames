import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0=new Auth();

class UpdateQuestion extends Component{
   constructor(props){
       super(props);
       this.state={
                question:{
                        gameid:1,
                        gametype:"multiplechoice",
                        difficulty_level:"",
                        question_statement:"",
                        weight:"",
                        explanation:"",
                        isitmedia:""
                },
                search:{
                        id:null
                }
        };
       
       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.handleReset=this.handleReset.bind(this);
       this.handleSearch=this.handleSearch.bind(this);
       this.handleSearchChange=this.handleSearchChange.bind(this);
   }

   handleSearchChange(event){
        event.preventDefault();
    
        switch(event.target.name)
        {
            case "id":
                this.setState({
                        search:{
                                id:event.target.value
                        }
                    }
                    ,
                    ()=>{
                            console.log(this.state.search); 
                        }
                );
                break;
            default:
                break;
        }
    }

   handleReset(e){
    this.setState({
         search:{
                 id:''
             }
         },
         () => {
                     console.log(this.state.search) 
         }
    );
   }
   
   handleChange(e){
        e.preventDefault();
        const sc=e.target.value;
        
        switch(e.target.name)
        {
            case "caption":
                this.setState({
                    question:{
                        id:this.state.question.id,
                        caption:sc,
                        gamedescription:this.state.question.gamedescription,
                        gametype:this.state.question.gametype
                    }
                });
                break;
            case "gamedescription":
                this.setState({
                    question:{
                        id:this.state.question.id,
                        caption:this.state.question.caption,
                        gamedescription:sc,
                        gametype:this.state.question.gametype
                    }
                });
                break;
            case "gametype":
                this.setState({
                    question:{
                        id:this.state.question.id,
                        caption:this.state.question.caption,
                        gametype:sc,
                        gamedescription:this.state.question.gamedescription
                    }
                });
                break;
            default:
                break;
        }
   }

    handleSearch(){
        fetch(config.baseUrl + `/selectQuestionforDel`, {
        method: 'post',        
        headers: {
                "authorization": "Bearer "+auth0.getAccessToken(),
                "Content-Type": "Application/json",
                "Accept":"application/json"
        },
        body: JSON.stringify(this.state.search)
    })
    .then((res) => res.json())      
    .then((data)=>{
            if(data.message==='Not found')
            {
                alert("Question with specified Id is not found");
            }
            else
            {
                console.log(data);   
                this.setState({              
                    question:{
                        id:data[0].id,
                        gameid:data[0].gameid,
                        gametype:data[0].gametype,
                        difficulty_level:data[0].difficulty_level,
                        question_statement:data[0].question_statement,
                        weight:data[0].weight,
                        explanation:data[0].explanation,
                        isitmedia:data[0].isitmedia
                    }
                });
            }       
    })
    .catch((error)=>console.log(error))
    }

   handleSubmit(e){
      e.preventDefault();                      
      const url =config.baseUrl + "/updatequestion";
      fetch(url, {
            method: 'POST',
            headers: {
                    "authorization": "Bearer "+auth0.getAccessToken(),
                    "Content-Type": "Application/json",
                    "Accept":"application/json"
            },
            body: JSON.stringify(this.state.question),
            mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{         
            console.log(data);
            if(data.message==='updated successfully')
            {
                alert("Successfully Updated the game detail");
            }
      })
      .catch((error)=>console.log(error))  
   }
   
   render(){        
        return (
            <div>              
                <form className="searchQuestion">
                        <label>Question id 
                                <input type="text" name="id" value={this.state.search.id} onChange={this.handleSearchChange}/> <br/>
                        </label>                                
                        <label> 
                            <input type="button" name="Search" onClick={this.handleSearch} value="Search"/>
                            <input type="button" name="reset" onClick={this.handleReset} value="Reset"/>                                                              
                        </label>
                </form>     
                <div>
                    <form className="questionForm" onSubmit={this.handleSubmit}>        
                        <label>Question id
                            <input type="text" name="gameid" value={this.state.question.id} /> <br/>
                        </label>
                        <label>Game id
                            <input type="text" name="gameid" value={this.state.question.gameid} /> <br/>
                        </label>
                        <label>Question statement 
                            <input type="text" name="question_statement" value={this.state.question.question_statement}/> <br/>
                        </label>
                        <label>Question explanation 
                            <textarea type="text" name="explanation" value={this.state.question.explanation}> 
                            </textarea>
                            <br/>
                        </label>
                        <label>Difficulty level
                            <input type="text" name="difficulty_level" value={this.state.question.difficulty_level}/> <br/>
                        </label> 
                        <label>Weight
                            <input type="text" name="weight" value={this.state.question.weight}/> <br/>
                        </label> 
                        <label>is it media
                            <input type="text" name="answer" value={this.state.question.isitmedia}/> <br/>
                        </label> 
                        <button type="submit">Update Question</button>                     
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
/*    player_given_name:state.authDetail.authDetail.player_given_name,
    player_family_name:state.authDetail.authDetail.player_given_name,
    player_picture:state.authDetail.authDetail.player_picture,
    player_email:state.authDetail.authDetail.player_email,
    player_username:state.authDetail.authDetail.player_username,
    player_gender:state.authDetail.authDetail.player_gender,
    player_dateOfBirth:state.authDetail.authDetail.player_dateOfBirth
//	gameData: state.gameData 
*/
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => {
	return {
//		getGameData: (gameData) => dispatch(fetchGameData(gameData)),
//		getScores: (scores) => dispatch(fetchScores(scores)),
		setAuth:(authDetail) => dispatch(fetchAuthDetails(authDetail)),
		clearAuth:(authDetail)=> dispatch(clearAuthDetails(authDetail)),
	};
};

UpdateQuestion.propTypes = {
//	getGameData: PropTypes.func,
//	getScores: PropTypes.func,
//	gameData: PropTypes.object,
	authDetail:PropTypes.object,
//	setAuth: PropTypes.func,
//	clearAuth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateQuestion);