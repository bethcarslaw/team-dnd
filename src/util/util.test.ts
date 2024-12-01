import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readCsvFile } from './';

describe('readCsvFile', () => {
    let mockFile: Blob;

    beforeEach(() => {
        // Create a mock Blob file
        mockFile = new Blob(['Header\nrow1\nrow2'], { type: 'text/csv' });
    });

    it('should resolve with an array of strings from the CSV file', async () => {
        const result = await readCsvFile(mockFile);
        expect(result).toEqual(['header', 'row1', 'row2']);
    });

    it('should filter out empty lines', async () => {
        const mockFileWithEmptyLines = new Blob(['Header\n\nrow1\n'], {
            type: 'text/csv',
        });
        const result = await readCsvFile(mockFileWithEmptyLines);
        expect(result).toEqual(['header', 'row1']);
    });

    it('should return an empty array if the file is empty', async () => {
        const emptyFile = new Blob([''], { type: 'text/csv' });
        const result = await readCsvFile(emptyFile);
        expect(result).toEqual([]);
    });

    it('should return an empty array if the file content is not a string', async () => {
        const mockFileReader = vi
            .spyOn(global, 'FileReader')
            .mockImplementation(() => {
                const mockReader: Partial<FileReader> = {
                    readAsText: vi.fn(),
                    onload: null,
                    result: new Uint8Array([0x01, 0x02, 0x03]),
                };

                setTimeout(() => {
                    if (mockReader.onload) {
                        const event = new ProgressEvent(
                            'load'
                        ) as ProgressEvent<FileReader>;
                        mockReader.onload.call(mockReader as FileReader, event);
                    }
                }, 0);

                return mockReader as FileReader;
            });

        const result = await readCsvFile(new Blob([]));
        expect(result).toEqual([]);

        mockFileReader.mockRestore();
    });
    it('should reject if FileReader encounters an error', async () => {
        const mockFileReader = vi
            .spyOn(global, 'FileReader')
            .mockImplementation(() => {
                const mockReader: Partial<FileReader> = {
                    readAsText: vi.fn(),
                    onerror: null,
                    onload: null,
                    result: null,
                };

                setTimeout(() => {
                    if (mockReader.onerror) {
                        const event = new ProgressEvent(
                            'error'
                        ) as ProgressEvent<FileReader>;
                        mockReader.onerror.call(
                            mockReader as FileReader,
                            event
                        );
                    }
                }, 0);

                return mockReader as FileReader;
            });

        await expect(readCsvFile(new Blob(['test data']))).rejects.toThrow(
            'File was unable to be processed'
        );

        mockFileReader.mockRestore();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
});
