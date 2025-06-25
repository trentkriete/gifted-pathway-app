
# Gifted Pathways - Question Flow

This document outlines the decision tree for the Gifted Pathways application.

---

### Question 1 (ID: 0)
**Text:** Does the student have data from the ACCESS test (for language acquisition)?
- **Yes** -> Go to Question 2 (ID: 1)
- **No** -> Go to Question 9 (ID: 100)

---

### Question 2 (ID: 1)
**Text:** How many ACCESS test scores does the student have?
- **One** -> Go to Question 3 (ID: 2)
- **Two or more** -> Go to Question 7 (ID: 50)

---

### Question 3 (ID: 2)
**Text:** Does the student have a qualifying Cognitive score (typically 95th percentile or above)?
- **Yes** -> Go to Question 4 (ID: 10)
- **No** -> Go to Question 5 (ID: 20)

---

### Question 4 (ID: 10)
**Text:** In addition to the ACCESS and Cognitive scores, what other data is available?
- **An Observation score** -> **Result: ACCESS HGT GIA: 3**
- **An Achievement score** -> **Result: ACCESS HGT GIA: 4**
- **Anecdotal data indicating giftedness** -> **Result: ACCESS HGT GIA: 2**

---

### Question 5 (ID: 20)
**Text:** What combination of scores does the student have, in addition to the single ACCESS score?
- **Two Achievement scores in different academic areas** -> **Result: ACCESS GT GIA: 3**
- **Two Achievement scores in the same academic area** -> **Result: ACCESS GT with Strength Area: 2**
- **One Observation score and one Achievement score** -> Go to Question 6 (ID: 21)
- **One Observation score and anecdotal data** -> **Result: ACCESS GT GIA: 2**

---

### Question 6 (ID: 21)
**Text:** Are the Observation and Achievement scores in the same academic area?
- **Yes** -> **Result: ACCESS GT with Strength Area: 1**
- **No** -> **Result: ACCESS GT GIA: 1**

---

### Question 7 (ID: 50)
**Text:** Does the student have a qualifying Cognitive score (typically 95th percentile or above)?
- **Yes** -> **Result: ACCESS HGT GIA: 1**
- **No** -> Go to Question 8 (ID: 51)

---

### Question 8 (ID: 51)
**Text:** Is there anecdotal data indicating giftedness?
- **Yes** -> **Result: ACCESS GT GIA: 4**
- **No** -> **Result: Inconclusive**

---

### Question 9 (ID: 100)
**Text:** Does the student have a qualifying Cognitive score (typically 95th percentile or above)?
- **Yes** -> Go to Question 10 (ID: 110)
- **No** -> Go to Question 13 (ID: 150)

---

### Question 10 (ID: 110)
**Text:** What combination of scores does the student have, in addition to the Cognitive score?
- **One Achievement score and one Observation score** -> Go to Question 11 (ID: 115)
- **Two Achievement scores** -> Go to Question 12 (ID: 116)
- **One Achievement score and anecdotal data** -> **Result: HGT GIA: 2**
- **One Observation score and anecdotal data** -> **Result: HGT GIA: 3**
- **A second Cognitive score and anecdotal data** -> **Result: HGT GIA: 1**

---

### Question 11 (ID: 115)
**Text:** Are the Achievement and Observation scores in the same academic area?
- **Yes** -> **Result: HGT with Strength Area: 1**
- **No** -> **Result: HGT GIA: 5**

---

### Question 12 (ID: 116)
**Text:** Are the two Achievement scores in the same academic area?
- **Yes** -> **Result: HGT with Strength Area: 2**
- **No** -> **Result: HGT GIA: 4**

---

### Question 13 (ID: 150)
**Text:** Is there anecdotal data indicating giftedness?
- **Yes** -> Go to Question 14 (ID: 160)
- **No** -> Go to Question 16 (ID: 180)

---

### Question 14 (ID: 160)
**Text:** What combination of scores does the student have (in addition to anecdotal data)?
- **Two Achievement scores** -> Go to Question 15 (ID: 161)
- **One Achievement score and one Observation score** -> Go to Question 16 (ID: 162)

---

### Question 15 (ID: 161)
**Text:** Are the two Achievement scores in the same academic area?
- **Yes** -> **Result: GT with Strength Area: 4**
- **No** -> **Result: GT GIA: 1**

---

### Question 16 (ID: 162)
**Text:** Are the Achievement and Observation scores in different academic areas?
- **Yes** -> **Result: GT GIA: 2**
- **No** -> **Result: GT with Strength Area: 3**

---

### Question 17 (ID: 180)
**Text:** What combination of scores does the student have?
- **One Observation score and two Achievement scores, all in the same academic area** -> **Result: GT with Strength Area: 1**
- **Three Achievement scores in the same academic domain (from at least two different assessments)** -> **Result: GT with Strength Area: 2**
- **Other combination** -> **Result: Inconclusive**

---

## Result Definitions

- **ACCESS HGT GIA: 1**: 2 or more ACCESS scores, 1 Cognitive score (95th+)
- **ACCESS HGT GIA: 2**: 1 ACCESS score, 1 Cognitive score (95th+), Anecdotal data indicating giftedness
- **ACCESS HGT GIA: 3**: 1 ACCESS score, 1 Cognitive score (95th+), 1 Observation score
- **ACCESS HGT GIA: 4**: 1 ACCESS score, 1 Cognitive score (95th+), 1 Achievement score
- **ACCESS GT GIA: 1**: 1 ACCESS score, 1 Achievement score, 1 Observation score (in different academic area than achievement score)
- **ACCESS GT GIA: 2**: 1 ACCESS score, 1 Observation score (in GIA or academic area), Anecdotal data indicating giftedness
- **ACCESS GT GIA: 3**: 1 ACCESS score, 2 Achievement scores (in different academic areas)
- **ACCESS GT GIA: 4**: 2 or more ACCESS scores, Anecdotal data indicating giftedness
- **ACCESS GT with Strength Area: 1**: 1 ACCESS score, 1 Observation score in an academic area, 1 Achievement score in same academic area as observation score
- **ACCESS GT with Strength Area: 2**: 1 ACCESS score, 2 Achievement scores in same academic area
- **HGT GIA: 1**: 2 Cognitive scores (95th+), Anecdotal data indicating giftedness
- **HGT GIA: 2**: 1 Cognitive score (95th+), 1 Achievement score, Anecdotal data indicating giftedness
- **HGT GIA: 3**: 1 Cognitive score (95th+), 1 Observation score, Anecdotal data indicating giftedness
- **HGT GIA: 4**: 1 Cognitive score (95th+), 2 Achievement scores in different academic areas
- **HGT GIA: 5**: 1 Cognitive score (95th+), 1 Achievement score, 1 Observation score in a different academic area than the achievement score
- **HGT with Strength Area: 1**: 1 Cognitive score (95th+), 1 Observation score in an academic area, 1 Achievement score in same academic area as observation score
- **HGT with Strength Area: 2**: 1 Cognitive score (95th+), 2 Achievements scores in same academic area
- **GT GIA: 1**: 2 Achievement scores (in different academic areas), Anecdotal data indicating giftedness
- **GT GIA: 2**: 1 Achievement score, 1 Observation score (in different academic area than achievement score), Anecdotal data indicating giftedness
- **GT with Strength Area: 1**: 1 Observation score in an academic area, 2 Achievement test scores in the same strength area
- **GT with Strength Area: 2**: 3 Achievement test scores (must be from at least two different assessments in the same academic domain)
- **GT with Strength Area: 3**: 1 Observation score in an academic area, 1 Achievement score in same academic area as observation score, Anecdotal data indicating giftedness
- **GT with Strength Area: 4**: 2 Achievement scores in same academic area, Anecdotal data indicating giftedness
- **Inconclusive**: The pathway could not be determined. The selected criteria often require anecdotal data to support identification.

