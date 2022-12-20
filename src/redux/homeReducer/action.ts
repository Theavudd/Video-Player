const setLanguage = (payload: string) => {
  return (dispatch: any) => {
    console.log('inSet');
    dispatch({type: 'Home/language', payload});
  };
};

export {setLanguage};
