export const setLocal = (item) => {
  const recent = localStorage.getItem("recently")
    ? JSON.parse(localStorage.getItem("recently"))
    : [];
  const exist = recent.some((p) => p.id === item.id);
  
  !exist && item != {} && localStorage.setItem('recently',JSON.stringify([...recent,item]))
  
};

export const getLocal = () => {
    const recent = localStorage.getItem('recently') ? JSON.parse(localStorage.getItem('recently')) : []
    return recent
}