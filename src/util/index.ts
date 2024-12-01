export const readCsvFile = (file: Blob): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const fileData = reader.result;

            if (!fileData || typeof fileData !== 'string') {
                resolve([]);
                return;
            }

            resolve(
                (reader.result as string)
                    .toLowerCase()
                    .split('\n')
                    .filter(Boolean)
            );
        };

        reader.onerror = () => {
            reject(new Error('File was unable to be processed'));
        };

        reader.readAsText(file);
    });
};

export const createCSVFileDownload = (
    csvContent: string,
    fileName: string = 'kaleidoscope'
) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
