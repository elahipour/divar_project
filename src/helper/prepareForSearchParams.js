function prepareForSearchParams(isChecked){
   return Object.values(isChecked)
    .filter((item) => item !== "")
    .join("-");
}
export {prepareForSearchParams}