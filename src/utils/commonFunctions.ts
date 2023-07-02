const RootDirectory = '/storage/emulated/0/';

const checkFile = (item: any) => {
  let fileName = item.name.split('.');
  return fileName[fileName.length - 1];
};
const debounceFunc = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timeoutId: number;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const getFileSize = () => {};

export {RootDirectory, checkFile, debounceFunc, getFileSize};
