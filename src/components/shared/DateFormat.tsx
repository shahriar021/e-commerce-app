export const formatDate = (value: any) => {
  const formatedValue = value.slice(0, 8);
  const finalFomatedDate = formatedValue.split("/").reverse().join("-");
  return finalFomatedDate;
};
