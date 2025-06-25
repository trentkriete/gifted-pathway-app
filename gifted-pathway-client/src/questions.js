
const questions = [
    {
        id: 0,
        text: "Does the student have data from the ACCESS test (for language acquisition)?",
        options: [
            { text: "Yes", next: 1 },
            { text: "No", next: 100 }
        ]
    },
    // --- ACCESS PATHWAYS ---
    {
        id: 1,
        text: "How many ACCESS test scores does the student have?",
        options: [
            { text: "One", next: 2 },
            { text: "Two or more", next: 50 }
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
        text: "In addition to the ACCESS and Cognitive scores, what other data is available?",
        options: [
            { text: "An Observation score", next: "RESULT_ACCESS_HGT_GIA_3" },
            { text: "An Achievement score", next: "RESULT_ACCESS_HGT_GIA_4" },
            { text: "Anecdotal data indicating giftedness", next: "RESULT_ACCESS_HGT_GIA_2" }
        ]
    },
    // --- 1 ACCESS Score -> GT Path ---
    {
        id: 20,
        text: "What combination of scores does the student have, in addition to the single ACCESS score?",
        options: [
            { text: "Two Achievement scores in different academic areas", next: "RESULT_ACCESS_GT_GIA_3" },
            { text: "Two Achievement scores in the same academic area", next: "RESULT_ACCESS_GT_STRENGTH_2" },
            { text: "One Observation score and one Achievement score", next: 21 },
            { text: "One Observation score and anecdotal data", next: "RESULT_ACCESS_GT_GIA_2" }
        ]
    },
    {
        id: 21,
        text: "Are the Observation and Achievement scores in the same academic area?",
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
        text: "What combination of scores does the student have, in addition to the Cognitive score?",
        options: [
            { text: "One Achievement score and one Observation score", next: 115 },
            { text: "Two Achievement scores", next: 116 },
            { text: "One Achievement score and anecdotal data", next: "RESULT_HGT_GIA_2" },
            { text: "One Observation score and anecdotal data", next: "RESULT_HGT_GIA_3" },
            { text: "A second Cognitive score and anecdotal data", next: "RESULT_HGT_GIA_1" }
        ]
    },
    {
        id: 115,
        text: "Are the Achievement and Observation scores in the same academic area?",
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
            { text: "Yes", next: 160 },
            { text: "No", next: 180 }
        ]
    },
    {
        id: 160,
        text: "What combination of scores does the student have (in addition to anecdotal data)?",
        options: [
            { text: "Two Achievement scores", next: 161 },
            { text: "One Achievement score and one Observation score", next: 162 }
        ]
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
        text: "What combination of scores does the student have?",
        options: [
            { text: "One Observation score and two Achievement scores, all in the same academic area", next: "RESULT_GT_STRENGTH_1" },
            { text: "Three Achievement scores in the same academic domain (from at least two different assessments)", next: "RESULT_GT_STRENGTH_2" },
            { text: "Other combination", next: "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL" }
        ]
    }
];

const results = {
    "RESULT_ACCESS_HGT_GIA_1": { pathway: "HGT GIA Pathways with ACCESS", title: "ACCESS HGT GIA: 1", criteria: ["2 or more ACCESS scores", "1 Cognitive score (95th+)"] },
    "RESULT_ACCESS_HGT_GIA_2": { pathway: "HGT GIA Pathways with ACCESS", title: "ACCESS HGT GIA: 2", criteria: ["1 ACCESS score", "1 Cognitive score (95th+)", "Anecdotal data indicating giftedness"] },
    "RESULT_ACCESS_HGT_GIA_3": { pathway: "HGT GIA Pathways with ACCESS", title: "ACCESS HGT GIA: 3", criteria: ["1 ACCESS score", "1 Cognitive score (95th+)", "1 Observation score"] },
    "RESULT_ACCESS_HGT_GIA_4": { pathway: "HGT GIA Pathways with ACCESS", title: "ACCESS HGT GIA: 4", criteria: ["1 ACCESS score", "1 Cognitive score (95th+)", "1 Achievement score"] },
    "RESULT_ACCESS_GT_GIA_1": { pathway: "GT GIA Pathways with ACCESS", title: "ACCESS GT GIA: 1", criteria: ["1 ACCESS score", "1 Achievement score", "1 Observation score (in different academic area than achievement score)"] },
    "RESULT_ACCESS_GT_GIA_2": { pathway: "GT GIA Pathways with ACCESS", title: "ACCESS GT GIA: 2", criteria: ["1 ACCESS score", "1 Observation score (in GIA or academic area)", "Anecdotal data indicating giftedness"] },
    "RESULT_ACCESS_GT_GIA_3": { pathway: "GT GIA Pathways with ACCESS", title: "ACCESS GT GIA: 3", criteria: ["1 ACCESS score", "2 Achievement scores (in different academic areas)"] },
    "RESULT_ACCESS_GT_GIA_4": { pathway: "GT GIA Pathways with ACCESS", title: "ACCESS GT GIA: 4", criteria: ["2 or more ACCESS scores", "Anecdotal data indicating giftedness"] },
    "RESULT_ACCESS_GT_STRENGTH_1": { pathway: "GT with a Strength Area and with ACCESS Pathways", title: "ACCESS GT with Strength Area: 1", criteria: ["1 ACCESS score", "1 Observation score in an academic area", "1 Achievement score in same academic area as observation score"] },
    "RESULT_ACCESS_GT_STRENGTH_2": { pathway: "GT with a Strength Area and with ACCESS Pathways", title: "ACCESS GT with Strength Area: 2", criteria: ["1 ACCESS score", "2 Achievement scores in same academic area"] },
    "RESULT_HGT_GIA_1": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 1", criteria: ["2 Cognitive scores (95th+)", "Anecdotal data indicating giftedness"] },
    "RESULT_HGT_GIA_2": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 2", criteria: ["1 Cognitive score (95th+)", "1 Achievement score", "Anecdotal data indicating giftedness"] },
    "RESULT_HGT_GIA_3": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 3", criteria: ["1 Cognitive score (95th+)", "1 Observation score", "Anecdotal data indicating giftedness"] },
    "RESULT_HGT_GIA_4": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 4", criteria: ["1 Cognitive score (95th+)", "2 Achievement scores in different academic areas"] },
    "RESULT_HGT_GIA_5": { pathway: "HGT GIA Pathways without ACCESS", title: "HGT GIA: 5", criteria: ["1 Cognitive score (95th+)", "1 Achievement score", "1 Observation score in a different academic area than the achievement score"] },
    "RESULT_HGT_STRENGTH_1": { pathway: "HGT with a Strength Area and without ACCESS Pathways", title: "HGT with Strength Area: 1", criteria: ["1 Cognitive score (95th+)", "1 Observation score in an academic area", "1 Achievement score in same academic area as observation score"] },
    "RESULT_HGT_STRENGTH_2": { pathway: "HGT with a Strength Area and without ACCESS Pathways", title: "HGT with Strength Area: 2", criteria: ["1 Cognitive score (95th+)", "2 Achievements scores in same academic area"] },
    "RESULT_GT_GIA_1": { pathway: "GT GIA Pathways without ACCESS", title: "GT GIA: 1", criteria: ["2 Achievement scores (in different academic areas)", "Anecdotal data indicating giftedness"] },
    "RESULT_GT_GIA_2": { pathway: "GT GIA Pathways without ACCESS", title: "GT GIA: 2", criteria: ["1 Achievement score", "1 Observation score (in different academic area than achievement score)", "Anecdotal data indicating giftedness"] },
    "RESULT_GT_STRENGTH_1": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 1", criteria: ["1 Observation score in an academic area", "2 Achievement test scores in the same strength area"] },
    "RESULT_GT_STRENGTH_2": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 2", criteria: ["3 Achievement test scores (must be from at least two different assessments in the same academic domain)"] },
    "RESULT_GT_STRENGTH_3": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 3", criteria: ["1 Observation score in an academic area", "1 Achievement score in same academic area as observation score", "Anecdotal data indicating giftedness"] },
    "RESULT_GT_STRENGTH_4": { pathway: "GT with a Strength Area and without ACCESS Pathways", title: "GT with Strength Area: 4", criteria: ["2 Achievement scores in same academic area", "Anecdotal data indicating giftedness"] },
    "RESULT_INCONCLUSIVE_NEEDS_ANECDOTAL": { pathway: "Inconclusive", title: "Inconclusive", criteria: ["The pathway could not be determined. The selected criteria often require anecdotal data to support identification."] }
};

export { questions, results };
