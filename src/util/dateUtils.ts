import format from 'date-fns/format';

export const sortReportDate = (reportData: string[]) => {
    const formtedDate = reportData.map((d: string) => {
        const splited = d.split(':');
        return new Date(`${splited[1]}/${splited[0]}/${splited[2]}`);
    });
    return formtedDate.sort((a: any, b: any) => a - b).map((d: any) => format(d, 'dd:MM:yyyy'));
}