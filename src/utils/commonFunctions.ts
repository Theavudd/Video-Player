const RootDirectory = '/storage/emulated/0/';

const checkFile = (item: any) => {
  let fileName = item.name.split('.');
  return fileName[fileName.length - 1];
};

export {RootDirectory, checkFile};
