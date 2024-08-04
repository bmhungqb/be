import db from "../models/index";

let handleExportData = () => {
  let data = [
    {
      id: 1,
      levelVocab: "Intermediate",
      vocab: "Eloquent",
      topicId: 101,
      phonetic: "/ˈɛləkwənt/",
      vietnamese: "Hùng hồn, truyền cảm, có tài diễn thuyết",
      example: "Her eloquent speech moved everyone in the audience.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 2,
      levelVocab: "Advanced",
      vocab: "Ubiquitous",
      topicId: 102,
      phonetic: "/juːˈbɪkwɪtəs/",
      vietnamese: "Có mặt khắp nơi, phổ biến",
      example: "Smartphones have become ubiquitous in modern society.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 3,
      levelVocab: "Beginner",
      vocab: "Serendipity",
      topicId: 103,
      phonetic: "/ˌsɛrənˈdɪpɪti/",
      vietnamese: "Sự tình cờ tìm thấy cái gì đó tốt đẹp khi không mong đợi",
      example:
        "Finding money you didn't know you had is an example of serendipity.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 4,
      levelVocab: "Intermediate",
      vocab: "Inevitable",
      topicId: 104,
      phonetic: "/ɪˈnɛvɪtəbəl/",
      vietnamese: "Không thể tránh khỏi, chắc chắn sẽ xảy ra",
      example: "Death is an inevitable part of life.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 5,
      levelVocab: "Advanced",
      vocab: "Ephemeral",
      topicId: 105,
      phonetic: "/ɪˈfɛmərəl/",
      vietnamese: "Tạm thời, phù du",
      example:
        "The beauty of the sunset was ephemeral, lasting only a few moments.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 6,
      levelVocab: "Beginner",
      vocab: "Amiable",
      topicId: 106,
      phonetic: "/ˈeɪmiəbl/",
      vietnamese: "Thân thiện, dễ mến",
      example: "She had an amiable personality that made her easy to talk to.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 7,
      levelVocab: "Intermediate",
      vocab: "Resilient",
      topicId: 107,
      phonetic: "/rɪˈzɪljənt/",
      vietnamese: "Kiên cường, có khả năng phục hồi nhanh chóng sau khó khăn",
      example:
        "Despite facing many challenges, she remained resilient and never gave up.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 8,
      levelVocab: "Advanced",
      vocab: "Melancholy",
      topicId: 108,
      phonetic: "/ˈmɛlənkəli/",
      vietnamese: "Buồn bã, u ám",
      example: "The sound of rain always fills him with a sense of melancholy.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
    {
      id: 9,
      levelVocab: "Beginner",
      vocab: "Astute",
      topicId: 109,
      phonetic: "/əˈstjuːt/",
      vietnamese: "Thông minh, sắc sảo",
      example: "His astute observations helped him solve the problem quickly.",
      createdAt: "2024-04-09T08:00:00Z",
      updatedAt: "2024-04-09T08:00:00Z",
    },
  ];

  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < data.length; i++) {
        console.log(`Processing data[${i}]:`, data[i]); // Add this line for debugging
        await db.Word.create({
          id: data[i]["id"],
          levelVocab: data[i]["levelVocab"],
          vocab: data[i]["vocab"],
          topicId: data[i]["topicId"],
          phonetic: data[i]["phonetic"],
          vietnamese: data[i]["vietnamese"],
          example: data[i]["example"],
          createdAt: data[i]["createdAt"],
          updatedAt: data[i]["updatedAt"],
        });
        console.log(`Inserted data[${i}]`); // Add this line for debugging
      }
      console.log("All data processed successfully"); // Add this line for debugging
      resolve({
        errCode: 0,
        errMessage: "Create new words success!",
      });
    } catch (e) {
      console.error("Error occurred during processing:", e); // Add this line for debugging
      reject(e);
    }
  });
};
export { handleExportData };
