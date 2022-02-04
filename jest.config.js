module.exports = {
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    snapshotSerializers: ["enzyme-to-json/serializer"],
    preset: "ts-jest",
    testMatch: [
        "**/*.(test|spec).(ts|tsx)"
    ],
    globals: {
        "ts-jest": {
            useBabelrc: true,
            tsConfigFile: "tsconfig.jest.json"
        }
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "enzyme.js",
        "<rootDir>/e2eTesting/*",
    ],
    testPathIgnorePatterns: [
        "<rootDir>/e2eTesting/*",
    ],
    setupTestFrameworkScriptFile: "<rootDir>/enzyme.js",
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    coverageReporters: [
        "json",
        "lcov",
        "text",
        "text-summary"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/mocks.js",
        "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js",
        '^@Pages/(.*)$': '<rootDir>/pages/$1',
        '^@Layout/(.*)$': '<rootDir>/src/layout/$1',
        '^@Store/(.*)$': '<rootDir>/src/store/$1',
        '^@Service/(.*)$': '<rootDir>/src/service/$1',
        '^@Reducers/(.*)$': '<rootDir>/src/reducers/$1',
        '^@Component/(.*)$': '<rootDir>/src/component/$1',
        '^src/component/(.*)$': '<rootDir>/src/component/$1',
        '^src/svgs/(.*)$': '<rootDir>/src/svgs/$1',
        '^src/(.*)$': '<rootDir>/src/$1',

    }
};