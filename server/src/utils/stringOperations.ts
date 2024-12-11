const method = (param: any): any => param.split(' ')[0][0] + param.split(' ').pop()![0];

export const getFirstAndLastName = (fullName: string): string => {
	const fullNameArray = fullName.split(' ');
	const firstName = fullNameArray[0];
	const lastName = fullNameArray.length > 1 ? fullNameArray.pop()! : '';
	const firstAndLastName = `${firstName} ${lastName}`;
	return firstAndLastName;
}

export const getInitialsFromName = (fullName: string, justFromFirstAndLastName:boolean=false): string => {
	
	if(justFromFirstAndLastName) fullName = getFirstAndLastName(fullName);
	const fullNameArray = fullName.split(' ');
	let initialsFromNameArray: string[] = [];
	fullNameArray.forEach((element) => {
		initialsFromNameArray.push(element[0]);
	});
	const initialsFromName = initialsFromNameArray.join('');
	return initialsFromName;
}

export const generateProfileImageUrl = (fullName: string): string => `https://ui-avatars.com/api/?background=008025&color=ffffff&name=${getInitialsFromName(fullName, true)}&size=100`;























