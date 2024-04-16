const { NlpManager } = require('node-nlp');

// Creating a new NLP manager
const manager = new NlpManager({ languages: ['en'], forceNER: true });

// Adding training examples for each question
manager.addDocument('en', 'How do you usually spend your free time?', 'question.free_time_activities');
manager.addDocument('en', 'What are your favorite hobbies or interests?', 'question.hobbies_interests');
manager.addDocument('en', 'Do you prefer working in a team or independently?', 'question.teamwork_preference');
manager.addDocument('en', 'What is your greatest achievement so far?', 'question.greatest_achievement');
manager.addDocument('en', 'How do you deal with failure?', 'question.failure_handling');
manager.addDocument('en', 'What is your opinion about life?', 'question.life_opinion');
manager.addDocument('en', 'What makes you feel alive?', 'question.alive_feeling');
manager.addDocument('en', 'What are your plans for the future?', 'question.future_plans');
manager.addDocument('en', 'Do you have any goal or objective you want to achieve?', 'question.goals_objectives');
manager.addDocument('en', 'What inspires you to be a better person?', 'question.inspiration_better_person');
manager.addDocument('en', 'How do you handle challenges and adversities?', 'question.challenges_adversities_handling');
manager.addDocument('en', 'What is your greatest fear?', 'question.greatest_fear');
manager.addDocument('en', 'Do you believe in destiny or free will?', 'question.destiny_free_will');
manager.addDocument('en', 'What is your perspective on love?', 'question.love_perspective');
manager.addDocument('en', 'How do you define success?', 'question.success_definition');
// Add more questions as needed

// Adding more answers for the questions
manager.addAnswer('en', 'question.free_time_activities', 'I enjoy reading, practicing sports, and spending time outdoors.');
manager.addAnswer('en', 'question.hobbies_interests', 'My favorite hobbies include photography, gardening, and cooking.');
manager.addAnswer('en', 'question.teamwork_preference', "I prefer working in a team, but I'm also effective when working independently.");
manager.addAnswer('en', 'question.greatest_achievement', 'My greatest achievement so far was completing a marathon.');
manager.addAnswer('en', 'question.failure_handling', 'I see failure as an opportunity for learning and growth.');
manager.addAnswer('en', 'question.life_opinion', "Life is a journey filled with ups and downs, but it's worth living to the fullest.");
manager.addAnswer('en', 'question.alive_feeling', 'Being surrounded by nature and spending time with loved ones makes me feel alive.');
manager.addAnswer('en', 'question.future_plans', 'I have plans to travel to different countries and specialize in my career.');
manager.addAnswer('en', 'question.goals_objectives', 'My current goal is to become fluent in a new language.');
manager.addAnswer('en', 'question.inspiration_better_person', "The opportunity to make a difference in people's lives inspires me to be a better person.");
manager.addAnswer('en', 'question.challenges_adversities_handling', 'I face challenges with determination and a positive mindset.');
manager.addAnswer('en', 'question.greatest_fear', 'My greatest fear is not fulfilling my dreams and aspirations.');
manager.addAnswer('en', 'question.destiny_free_will', 'I believe in a combination of destiny and free will.');
manager.addAnswer('en', 'question.love_perspective', 'To me, love is a deep connection and mutual commitment.');
manager.addAnswer('en', 'question.success_definition', 'Success to me is achieving my goals and being happy with who I am.');
// Train the model

async function getArchetype(responses) {
    const analysis = {
        positive: 0,
        negative: 0,
        introvert: 0,
        extrovert: 0,
        // Add more characteristics as needed
    };

    for (const response of responses) {
        const processedResponse = await manager.process('en', response);
        // Analyze the processing of responses to determine user characteristics
        // Here you can implement logic to assign scores to characteristics based on responses
        // For example, you can check keywords in responses or use sentiment analysis to determine positivity or negativity
        // This is a simplified implementation for example purposes only
        console.log({ entities: processedResponse.entities })
        if (processedResponse.sentiment.vote === 'positive') {
            analysis.positive++;
        } else if (processedResponse.sentiment.vote === 'negative') {
            analysis.negative++;
        }

        if (processedResponse.entities && processedResponse.entities.introvert) {
            analysis.introvert++;
        }

        if (processedResponse.entities && processedResponse.entities.extrovert) {
            analysis.extrovert++;
        }
    }

    // Determine the archetype based on the analyzed characteristics
    let archetype = '';

    // Example logic to determine the archetype
    if (analysis.positive > analysis.negative) {
        archetype += 'Optimistic ';
    } else {
        archetype += 'Pessimistic ';
    }

    if (analysis.introvert > analysis.extrovert) {
        archetype += 'Introverted';
    } else {
        archetype += 'Extroverted';
    }

    return archetype;
}

// Example of usage: ask a series of questions and determine the archetype
async function determineArchetype() {
    const responses = [
        "I am an optimistic person and I enjoy spending time alone.",
        "I like challenges and constantly learning new things.",
        "I am a very solitary person, but I enjoy being with close friends.",
        "My family is my biggest motivation in life.",
        "I find joy in the little things in life, like watching the sunset.",
        "I am very dedicated to my work and goals.",
        "I love exploring new cultures and trying different cuisines.",
        "I am introverted by nature, but it doesn't stop me from socializing when necessary.",
        "I believe love is the most powerful force in the universe.",
        "I am constantly striving for self-improvement and personal growth.",
        "I feel alive when I am in touch with nature and engaging in outdoor sports.",
        "I tackle challenges with courage and determination, always seeking solutions.",
        "My biggest goal in life is to make a positive difference in the world around me.",
        "I see failure as an opportunity to learn and grow as a person.",
        "I believe the key to happiness is living an authentic life true to my values."
        // Add more responses as needed
    ];

    const archetype = await getArchetype(responses);
    console.log(`Person's archetype: ${archetype}`);
}

(async () => {
    await manager.train();
    manager.save();
    console.log('Model trained successfully!');


    await determineArchetype()
})();
