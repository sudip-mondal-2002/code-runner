import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function seedProblemsAndTestCases() {
    try {
        // Create the "Add Two Numbers" problem
        const addTwoNumbersProblem = await prisma.problem.create({
            data: {
                tags: ['math', 'addition'],
                name: 'Add Two Numbers',
                description: 'Write a function that takes two numbers as input and returns their sum.',
                difficulty: 'EASY',
            },
        })

        // Create the "Find the Difference" problem
        const findDifferenceProblem = await prisma.problem.create({
            data: {
                tags: ['math', 'subtraction'],
                name: 'Find the Difference',
                description: 'Write a function that takes two numbers as input and returns their difference.',
                difficulty: 'EASY',
            },
        })

        // Create test cases for the "Add Two Numbers" problem
        await prisma.testCase.createMany({
            data: [
                {
                    input: '5 3', // Example input for adding 5 and 3
                    output: '8',  // Expected output for adding 5 and 3
                    problemId: addTwoNumbersProblem.id,
                    example: true,
                },
                {
                    input: '10 20', // Example input for adding 10 and 20
                    output: '30',   // Expected output for adding 10 and 20
                    problemId: addTwoNumbersProblem.id,
                    example: false,
                },
                // Add more test cases for "Add Two Numbers" as needed
            ],
        })

        // Create test cases for the "Find the Difference" problem
        await prisma.testCase.createMany({
            data: [
                {
                    input: '8 3',  // Example input for finding the difference between 8 and 3
                    output: '5',   // Expected output for finding the difference between 8 and 3
                    problemId: findDifferenceProblem.id,
                    example: true,
                },
                {
                    input: '15 7', // Example input for finding the difference between 15 and 7
                    output: '8',   // Expected output for finding the difference between 15 and 7
                    problemId: findDifferenceProblem.id,
                    example: false,
                },
                // Add more test cases for "Find the Difference" as needed
            ],
        })

        console.log('Seeds for problems and test cases have been created successfully.')
    } catch (error) {
        console.error('Error seeding problems and test cases:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedProblemsAndTestCases()
