import '@testing-library/jest-dom';
import { vi } from 'vitest';

Object.defineProperty(global, 'URL', {
    value: {
        createObjectURL: vi.fn(() => 'blob:fake-url'),
        revokeObjectURL: vi.fn(),
    },
});
