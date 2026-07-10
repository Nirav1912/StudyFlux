export function analyzePerformance(questions, answers) {

  const topicStats = {};

  questions.forEach((q, index) => {

    if (!topicStats[q.topic]) {
      topicStats[q.topic] = {
        correct: 0,
        total: 0,
      };
    }

    topicStats[q.topic].total++;

    if (answers[index] === q.answer) {
      topicStats[q.topic].correct++;
    }

  });

  const strongTopics = [];
  const weakTopics = [];

  Object.entries(topicStats).forEach(([topic, stat]) => {

    const accuracy =
      (stat.correct / stat.total) * 100;

    if (accuracy >= 70)
      strongTopics.push(topic);
    else
      weakTopics.push(topic);

  });

  return {
    strongTopics,
    weakTopics,
  };

}