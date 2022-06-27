import {processStepsMap} from '../constants/ProcessList'
export const getNewRequestEntries = (entries,activeProcess) => {

let filterValues = processStepsMap[activeProcess]
 let obj = {}

 filterValues.forEach((item) => {
     obj[item.value] = entries[item.value]
 })

 return obj

}