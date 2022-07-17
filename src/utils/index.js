import {processStepsMap} from '../constants/ProcessList'
export const getNewRequestEntries = (entries,activeProcess) => {

let filterValues = processStepsMap[activeProcess]
 let obj = {}

 filterValues.forEach((item) => {
     obj[item.value] = entries[item.value]
 })

 return obj

}

export const  isEmpty= ( val ) => {
        if (val === undefined)
        return true;

    if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
        return false;

    if (val == null || val.length === 0)        // null or 0 length array
        return true;

    if (typeof (val) == "object") {
        // empty object

        var r = true;

        for (var f in val)
            r = false;

        return r;
    }

    return false;
}

export const getSearchableDropdownItems = (usersList,userId) => {
    let temp=[]
    !isEmpty(usersList) && usersList.forEach((user) =>{
      if(user.userId !== userId) {
        temp.push({id : user.userId,name : user.name + ',' + user.phoneNo})
      }
    })

    return temp;
}