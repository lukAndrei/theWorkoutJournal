
import { ExerciseModel } from '../models/exercise.model'
import { SuperSetModel } from './superset.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from './appUser.model';
import { WorkoutComment } from './comment.model';

export class WorkoutModel {
    public name: string;
    public exerciseList: ExerciseModel[]=[];
    public superSetList: SuperSetModel[] = []
    public id;
    public date: NgbDateStruct;
    public timestamp: Date;
    public category: string;
  
    constructor(exerciseList,name?, id?,date?, timestamp?, category?){
          this.exerciseList = exerciseList;
          this.name = name;
          this.id = id;
          this.date = date;
          this.timestamp = timestamp;
          this.category = category;
    }

    static fromJSONlist(a:[]){
        return a.map(w=>WorkoutModel.initiateWorkout(w))
    }
    static initiateWorkout(w){
        let emptyExerciseList = []
        let timestamp = w.date.toDate()
        let workoutDate = ({
            year: timestamp.getFullYear(),
            month: timestamp.getMonth(),
            day: timestamp.getDate()
        })
        let category = w.category || ''
        return new WorkoutModel(emptyExerciseList, w.name, w.id, workoutDate, timestamp, category)
    }
    addEx(exercise:ExerciseModel){
        this.exerciseList.push(exercise)
    }
    addSuperSet(superSet:SuperSetModel){
        this.superSetList.push(superSet)  
    }
    addExToSuperSet(index,ex){
        this.superSetList[index].exerciseList.push(ex)
    }
    removeExFromSuperSet(index,name){
        this.superSetList[index].deleteExFromSet(name);
        this.updateSuperSetList();
      
    }
    removeEx(index){
        this.exerciseList.splice(index,1)
    }
    removeSuperSet(index){
        this.superSetList.splice(index,1)
    }

    removeExFromAll(exercise){
          this.superSetList.map((superSet, index)=>{
             superSet.deleteExFromSet(exercise)
         })
         this.updateSuperSetList()
    }
    updateSuperSetList(){
        this.superSetList = this.superSetList.filter(superSet=>superSet.exerciseList.length>0)
    }

}