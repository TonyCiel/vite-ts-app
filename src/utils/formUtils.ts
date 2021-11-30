import {Ref,unref} from 'vue';
// 校验表单
export function valideForm(ref: Ref | any) {
    console.log('unref(ref)',unref(ref))
    const validateFn = unref(ref).validate;
    return new Promise((resolve) => {
        validateFn((isValid:Boolean) => {
            resolve(isValid)
        })
    })

}
// 重制表单或者表单某个字段

export function clearFieldValid(ref: Ref | any,fields: Array<String>) {
    const clearValidate = unref(ref).clearValidate;
    if(fields.length) {
        clearValidate(fields);
    } else {
        clearValidate();
    }
}