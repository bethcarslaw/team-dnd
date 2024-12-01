import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup,
} from '@testing-library/vue';
import { vi } from 'vitest';
import App from './App.vue';
import { readCsvFile } from './util';

vi.mock('./util', () => ({
    readCsvFile: vi.fn(),
}));

describe('App.vue', () => {
    let fileInput: HTMLInputElement;

    beforeEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    it('should handle employee upload correctly', async () => {
        const mockEmployees = ['john doe', 'jane smith'];

        (readCsvFile as any).mockResolvedValueOnce(mockEmployees);

        render(App);

        fileInput = screen.getByTestId(
            'employee-upload-input'
        ) as HTMLInputElement;

        await fireEvent.change(fileInput, {
            target: { files: [new File([], 'employees.csv')] },
        });

        await waitFor(() => expect(readCsvFile).toHaveBeenCalledTimes(1));

        expect(screen.getByText('john doe')).toBeInTheDocument();
        expect(screen.getByText('jane smith')).toBeInTheDocument();
    });

    it('should handle team upload correctly', async () => {
        const mockTeamData = ['Engineering,john doe', 'Marketing,jane smith'];

        (readCsvFile as any).mockResolvedValueOnce(mockTeamData);

        render(App);

        fileInput = screen.getByTestId('team-upload-input') as HTMLInputElement;

        await fireEvent.change(fileInput, {
            target: { files: [new File([], 'team.csv')] },
        });

        await waitFor(() => expect(readCsvFile).toHaveBeenCalledTimes(1));

        expect(screen.getByText('Engineering')).toBeInTheDocument();
        expect(screen.getByText('Marketing')).toBeInTheDocument();
    });
});
