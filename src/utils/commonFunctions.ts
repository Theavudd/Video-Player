import moment from 'moment';

const RootDirectory = '/storage/emulated/0/';

const checkFile = (item: any) => {
  let fileName = item.name.split('.');
  return fileName[fileName.length - 1];
};
function debounceFunc(func: any, timeout = 500) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const getFileSize = (bytes: number) => {
  let temp;
  if (bytes >= 1073741824) {
    temp = (bytes / 1073741824).toFixed(2) + ' GB';
  } else if (bytes >= 1048576) {
    temp = (bytes / 1048576).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    temp = (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes > 1) {
    temp = bytes + ' bytes';
  } else if (bytes == 1) {
    temp = bytes + ' byte';
  } else {
    temp = '0 bytes';
  }
  return temp;
};

const getTime = (date: Date) => {
  const currentDate = new Date();
  const diffInDays = moment(currentDate).diff(date, 'days');

  if (diffInDays >= 7) {
    return moment(date).format('MMM DD, YYYY');
  } else {
    return moment(date).fromNow();
  }
};

const getTimeInSeconds = (time: string) => {
  console.log(time);
};

export {
  RootDirectory,
  checkFile,
  debounceFunc,
  getFileSize,
  getTime,
  getTimeInSeconds,
};
