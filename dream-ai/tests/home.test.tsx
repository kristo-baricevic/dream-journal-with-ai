import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'
import { resolve } from 'path'

vi.mock('@clerk/nextjs', () => {
    // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
    const mockedFunctions = {
        auth: () =>
            new Promise((resolve) =>
                resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
            ),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useUSer: () => ({
            isSignedIn: true,
            user: {
                id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
                fullName: 'John Smith',
            },
        }),
    }

    return mockedFunctions;
})

test(`Home`, async () => {
    render(await HomePage())
    expect(screen.getByText('Time to explore our dreams!')).toBeTruthy()
})