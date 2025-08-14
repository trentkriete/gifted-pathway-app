const questions = [
    {
        id: 0,
        text: "Does the student have data from the ACCESS test?",
        options: [
            { text: "Yes", next: 1 },
            { text: "No", next: 100 }
        ]
    },
    // --- ACCESS PATHWAYS ---
    {
        id: 1,
        text: "Does the student have two or more ACCESS test scores?  ",
        options: [
            { text: "Yes", next: 50 },
            { text: "No", next: 2 }
        ]
    },
    // --- 1 ACCESS Score ---
    {
        id: 2,
        text: "Does the student have a qualifying Cognitive score (typically 95th percentile or above)?",
        options: [
            { text: "Yes", next: 10 },
            { text: "No", next: 20 }
        ]
    },
    // --- 1 ACCESS Score -> HGT Path ---
    {
        id: 10,
        text: "Is there an Observation score?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_HGT_GIA_3" },
            { text: "No", next: 11 }
        ]
    },
    {
        id: 11,
        text: "Is there an Achievement score?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_HGT_GIA_4" },
            { text: "No", next: 12 }
        ]
    },
    {
        id: 12,
        text: "Is there anecdotal data indicating giftedness?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_HGT_GIA_2" },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    },
    // --- 1 ACCESS Score -> GT Path ---
    {
        id: 20,
        text: "Does the student have an Observation score?",
        options: [
            { text: "Yes", next: 27 },
            { text: "No", next: 28 }
        ]
    },
    {
        id: 22,
        text: "Are the two Achievement scores in the same academic area?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_GT_STRENGTH_2" },
            { text: "No", next: "RESULT_ACCESS_GT_GIA_3" }
        ]
    },
    {
        id: 23,
        text: "Does the student have an Observation score?",
        options: [
            { text: "Yes", next: 27 },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    },
    {
        id: 24,
        text: "Do they have one Observation score and anecdotal data?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_GT_GIA_2" },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    },
    {
        id: 27,
        type: 'subject-multiselect',
        text: "Select the subject(s) with Achievement scores:",
        subjects: ["Literacy", "Math", "Science", "Social Studies"],
        onTwoOrMore: "RESULT_ACCESS_GT_STRENGTH_2",
        onTwoDifferent: "RESULT_ACCESS_GT_GIA_3",
        nextIfNotTwoOrMore: 21,
        sameAreaYesResult: "RESULT_ACCESS_GT_STRENGTH_1",
        sameAreaNoResult: "RESULT_ACCESS_GT_GIA_1",
        noAchievementNext: 26
    },
    {
        id: 28,
        type: 'subject-multiselect',
        text: "Select the subject(s) with Achievement scores:",
        subjects: ["Literacy", "Math", "Science", "Social Studies"],
        onTwoOrMore: "RESULT_ACCESS_GT_STRENGTH_2",
        onTwoDifferent: "RESULT_ACCESS_GT_GIA_3",
        nextIfNotTwoOrMore: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL",
        noAchievementNext: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL"
    },
    
    {
        id: 26,
        text: "Does the student have anecdotal data indicating giftedness?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_GT_GIA_2" },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    },
    {
        id: 21,
        text: "Is the Observation score also in [SUBJECT]?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_GT_STRENGTH_1" },
            { text: "No", next: "RESULT_ACCESS_GT_GIA_1" }
        ]
    },
    // --- 2+ ACCESS Scores ---
    {
        id: 50,
        text: "Does the student have a qualifying Cognitive score (typically 95th percentile or above)?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_HGT_GIA_1" },
            { text: "No", next: 51 }
        ]
    },
    {
        id: 51,
        text: "Is there anecdotal data indicating giftedness?",
        options: [
            { text: "Yes", next: "RESULT_ACCESS_GT_GIA_4" },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    },
    // --- NO ACCESS PATHWAYS ---
    {
        id: 100,
        text: "Does the student have a qualifying Cognitive score (typically 95th percentile or above)?",
        options: [
            { text: "Yes", next: 110 },
            { text: "No", next: 150 }
        ]
    },
    // --- NO ACCESS -> HGT Path ---
    {
        id: 110,
        text: "Does the student have an Observation score?",
        options: [
            { text: "Yes", next: 118 },
            { text: "No", next: 119 }
        ]
    },
    {
        id: 119,
        type: 'subject-multiselect',
        text: "Select the subject(s) with Achievement scores:",
        subjects: ["Literacy", "Math", "Science", "Social Studies"],
        onTwoOrMore: "RESULT_HGT_STRENGTH_2",
        onTwoDifferent: "RESULT_HGT_GIA_4",
        nextIfNotTwoOrMore: 113,
        noAchievementNext: 113
    },
    {
        id: 118,
        type: 'subject-multiselect',
        text: "Select the subject(s) with Achievement scores:",
        subjects: ["Literacy", "Math", "Science", "Social Studies"],
        onTwoOrMore: "RESULT_HGT_STRENGTH_2",
        nextIfNotTwoOrMore: 115,
        sameAreaYesResult: "RESULT_HGT_STRENGTH_1",
        sameAreaNoResult: 113,
        noAchievementNext: 113
    },
    
    {
        id: 111,
        text: "Do they have two Achievement scores?",
        options: [
            { text: "Yes", next: 116 },
            { text: "No", next: 113 }
        ]
    },
    
    {
        id: 113,
		text: "Is there anecdotal data indicating giftedness?",
        options: [
            { text: "Yes", next: "RESULT_HGT_GIA_2" },
            { text: "No", next: "RESULT_HGT_GIA_4" }
        ]
    },
    {
        id: 114,
        text: "Do they have a second Cognitive score and anecdotal data?",
        options: [
            { text: "Yes", next: "RESULT_HGT_GIA_1" },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    },
    {
        id: 115,
        text: "Is the Observation score also in [SUBJECT]?",
        options: [
            { text: "Yes", next: "RESULT_HGT_STRENGTH_1" },
            { text: "No", next: "RESULT_HGT_GIA_5" }
        ]
    },
    {
        id: 116,
        text: "Are the two Achievement scores in the same academic area?",
        options: [
            { text: "Yes", next: "RESULT_HGT_STRENGTH_2" },
            { text: "No", next: "RESULT_HGT_GIA_4" }
        ]
    },
    // --- NO ACCESS -> GT Path ---
    {
        id: 150,
        text: "Is there anecdotal data indicating giftedness?",
        options: [
            { text: "Yes", next: 163 },
            { text: "No", next: 163 }
        ]
    },
    {
        id: 163,
        text: "Does the student have an Observation score?",
        options: [
            { text: "Yes", next: 165 },
            { text: "No", next: 165 } // Changed from "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" to 165
        ]
    },
    {
        id: 165,
        type: 'subject-multiselect',
        text: "Select the subject(s) with Achievement scores:",
        subjects: ["Literacy", "Math", "Science", "Social Studies"],
        onTwoOrMore: "RESULT_GT_STRENGTH_1", // Changed from "RESULT_GT_STRENGTH_4" to "RESULT_GT_STRENGTH_1"
        nextIfNotTwoOrMore: 162,
        sameAreaYesResult: "RESULT_GT_STRENGTH_3",
        sameAreaNoResult: "RESULT_GT_GIA_2",
        onTwoDifferent: "RESULT_GT_GIA_1", // Ensure this is correct
        noAchievementNext: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL"
    },
    
    {
        id: 161,
        text: "Are the two Achievement scores in the same academic area?",
        options: [
            { text: "Yes", next: "RESULT_GT_STRENGTH_4" },
            { text: "No", next: "RESULT_GT_GIA_1" }
        ]
    },
    {
        id: 162,
        text: "Are the Achievement and Observation scores in different academic areas?",
        options: [
            { text: "Yes", next: "RESULT_GT_GIA_2" },
            { text: "No", next: "RESULT_GT_STRENGTH_3" }
        ]
    },
    {
        id: 180,
        text: "Do they have one Observation score and two Achievement scores, all in the same academic area?",
        options: [
            { text: "Yes", next: "RESULT_GT_STRENGTH_1" },
            { text: "No", next: 181 }
        ]
    },
    {
        id: 181,
        text: "Do they have three Achievement scores in the same academic domain (from at least two different assessments)?",
        options: [
            { text: "Yes", next: "RESULT_GT_STRENGTH_2" },
            { text: "No", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    }
];

const results = {
    "RESULT_ACCESS_HGT_GIA_1": { pathway: "HGT GIA Pathways with ACCESS", title: "ACCESS HGT GIA: 1", criteria: ["2 or more ACCESS scores", "1 Cognitive score (95th+)"] },
    "RESULT_ACCESS_HGT_GIA_2": { pathway: "HGT GIA Pathways with ACCESS", title: "ACCESS HGT GIA: 2", criteria: ["1 Cognitive score (95th+)", "Anecdotal data indicating giftedness"] },
    "RESULT_HGT_GIA_3": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 3", criteria: ["1 Cognitive score (95th+)", "1 Observation score", "Anecdotal data indicating giftedness"] },
    "RESULT_HGT_GIA_4": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 4", criteria: ["1 Cognitive score (95th+)", "2 Achievement scores in different academic areas"] },
    "RESULT_HGT_GIA_5": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 5", criteria: ["1 Cognitive score (95th+)", "1 Achievement score", "1 Observation score in a different academic area than the achievement score"] },
    "RESULT_HGT_STRENGTH_1": { pathway: "HGT with a Strength Area and without ACCESS Pathways", title: "HGT with Strength Area: 1", criteria: ["1 Cognitive score (95th+)", "1 Observation score in an academic area", "1 Achievement score in same academic area as observation score"] },
    "RESULT_HGT_STRENGTH_2": { pathway: "HGT with a Strength Area and without ACCESS Pathways", title: "HGT with Strength Area: 2", criteria: ["1 Cognitive score (95th+)", "2 Achievements scores in same academic area"] },
    "RESULT_GT_GIA_1": { pathway: "GT GIA Pathways without ACCESS", title: "GT GIA: 1", criteria: ["2 Achievement scores (in different academic areas)"] },
    "RESULT_GT_GIA_2": { pathway: "GT GIA Pathways without ACCESS", title: "GT GIA: 2", criteria: ["1 Achievement score", "1 Observation score (in different academic area than achievement score)", "Anecdotal data indicating giftedness"] },
    "RESULT_GT_STRENGTH_1": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 1", criteria: ["1 Observation score in an academic area", "2 Achievement test scores in the same strength area"] },
    "RESULT_GT_STRENGTH_2": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 2", criteria: ["3 Achievement test scores (must be from at least two different assessments in the same academic domain)"] },
    "RESULT_GT_STRENGTH_3": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 3", criteria: ["1 Observation score in an academic area", "1 Achievement score in same academic area as observation score"] },
    "RESULT_GT_STRENGTH_4": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 4", criteria: ["2 Achievement scores in same academic area", "Anecdotal data indicating giftedness"] },
    "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL": { pathway: "Inconclusive", title: "Inconclusive", criteria: ["The pathway could not be determined. The selected criteria often require anecdotal data to support identification."]}
};

export { questions, results };