const setLanguage = (payload: string) => {
  return (dispatch: any) => {
    dispatch({type: 'Home/language', payload});
  };
};

export {setLanguage};
