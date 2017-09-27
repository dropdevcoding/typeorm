import "reflect-metadata";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../utils/test-utils";
import {Connection} from "../../../../src/connection/Connection";
import {expect} from "chai";
import {Post} from "./entity/Post";
import {PostSchema} from "./entity/PostSchema";
import {Counters} from "./entity/Counters";
import {CountersSchema} from "./entity/CountersSchema";

describe("entity-schema", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entitySchemas: [
          <any>PostSchema,
          <any>CountersSchema
        ],
        schemaCreate: true,
        dropSchema: true
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    describe("embeddeds", function() {
        it.only("should define embeddeds propertly", () => Promise.all(connections.map(async connection => {
          const postRepository = connection.getRepository(Post);

          const post = new Post();
          post.title = "Hello post";
          post.text = "This is text about the post";
          post.counters = new Counters();
          post.counters.comments = 5;
          post.counters.favorites = 2;
          post.counters.likes = 1;

          await postRepository.save(post);

          // now load it
          const loadedPost = (await postRepository.findOneById(1))!;
          loadedPost.id.should.be.equal(1);
          loadedPost.title.should.be.equal("Hello post");
          loadedPost.text.should.be.equal("This is text about the post");
          loadedPost.counters.should.be.eql({
              comments: 5,
              favorites: 2,
              likes: 1
          });

          // now update the post
          loadedPost.counters.favorites += 1;

          await postRepository.save(loadedPost);

          // now check it
          const loadedPost2 = (await postRepository.findOneById(1))!;
          loadedPost2.id.should.be.equal(1);
          loadedPost2.title.should.be.equal("Hello post");
          loadedPost2.text.should.be.equal("This is text about the post");
          loadedPost2.counters.should.be.eql({
              comments: 5,
              favorites: 3,
              likes: 1
          });

          await postRepository.remove(loadedPost2);

          // now check it
          const loadedPost3 = (await postRepository.findOneById(1))!;
          expect(loadedPost3).to.be.undefined;
        })));
    });

});
