require('dotenv/config');

import fs from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

import Comment from '../models/Comment';

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY_WATSON,
  }),
  serviceUrl: process.env.API_URL_WATSON,
});

class CommentController {
  async index(request, response) {
    try {
      const comments = await Comment.findAll();

      return response.json(comments);
    } catch (error) {
      console.error(error);
      return response.json({ Erro: 'Não foi possível completar a requisição' });
    }
  }

  async store(request, response) {
    try {
      const nameFile = `${Date.now()}-${crypto
        .randomBytes(8)
        .toString('hex')}.wav`;

      const namePath = resolve('./', 'src', 'uploads', nameFile);

      console.log(namePath);

      const commentExists = await Comment.findOne({
        where: { content: request.body.content },
      });

      if (commentExists) {
        return response.status(400).json({ error: 'Comment already exists' });
      }

      const synthesizeParams = {
        text: request.body.content,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaVoice',
      };

      await textToSpeech
        .synthesize(synthesizeParams)
        .then((response) => {
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(async (buffer) => {
          fs.writeFileSync(namePath, buffer);
          console.log(buffer);

          const { id, content, path, createdAt, updatedAt } =
            await Comment.create({
              content: request.body.content,
              path: `uploads/${nameFile}`,
            });

          return response.json({
            id,
            content,
            path,
            createdAt,
            updatedAt,
          });
        })
        .catch((err) => {
          console.log('error:', err);
        });
    } catch (error) {
      console.error(error);
      return response.json({ Erro: 'Não foi possível completar a requisição' });
    }
  }

  async delete(request, response) {
    console.log('Ta funfando cara até o delete');
  }

  async generateAudio(text, namePath) {
    try {
      const synthesizeParams = {
        text: text,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaVoice',
      };

      textToSpeech
        .synthesize(synthesizeParams)
        .then((response) => {
          // The following line is necessary only for
          // wav formats; otherwise, `response.result`
          // can be directly piped to a file.
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then((buffer) => {
          fs.writeFileSync(namePath, buffer);
          console.log(buffer);
        })
        .catch((err) => {
          console.log('error:', err);
        });
      return;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new CommentController();
