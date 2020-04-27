
import { ExerciseModel } from '../models/exercise.model'
import { SuperSetModel } from './superset.model';
export class WorkoutModel {
    public name: string;
    public type: string;
    public exerciseList: ExerciseModel[]=[];
    public superSet: SuperSetModel[] = []
    public id;
    public date;
  
    constructor(exerciseList,name?, type?, id?,date?){
          this.exerciseList = exerciseList;
          this.name = name;
          this.type = type;
          this.id = id;
          this.date = date
    }

    static fromJSONlist(a:[]){
        return a.map(w=>WorkoutModel.initiateWorkout(w))
    }
    static initiateWorkout(w){
        let emptyExerciseList = []
        return new WorkoutModel(emptyExerciseList, w.name, w.type, w.id, w.date)
    }
    addEx(exercise:ExerciseModel){
        this.exerciseList.push(exercise)
    }
    addSuperSet(superSet:SuperSetModel){
        this.superSet.push(superSet)  
    }
    addExToSuperSet(index,ex){
        this.superSet[index].exerciseList.push(ex)
    }
    removeExFromSuperSet(index,name){
        this.superSet[index].exerciseList.forEach((ex,j)=>{
            if (ex.name==name){
                this.superSet[index].exerciseList.splice(j,1)
            }
            if (this.superSet[index].exerciseList.length==0){
                this.removeSuperSet(index)
            }
        });
    }
    removeEx(index){
        this.exerciseList.splice(index,1)
    }
    removeSuperSet(index){
        this.superSet.splice(index,1)
    }
    removeExFromAll(name){
        this.superSet.forEach((set,i)=>{
            set.exerciseList.forEach((ex,j)=>{
                if (ex.name==name){
                    this.superSet[i].exerciseList.splice(j,1)
                }
            })
            if (set.exerciseList.length==0){
                this.removeSuperSet(i)
            }
        })

    }
 
}