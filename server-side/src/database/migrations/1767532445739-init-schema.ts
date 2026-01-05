import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767532445739 implements MigrationInterface {
    name = 'InitSchema1767532445739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "status" integer NOT NULL, "closed" boolean NOT NULL DEFAULT (0), "data" text, "assignedUserId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "status" integer NOT NULL, "closed" boolean NOT NULL DEFAULT (0), "data" text, "assignedUserId" integer, CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8" FOREIGN KEY ("assignedUserId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "type", "status", "closed", "data", "assignedUserId") SELECT "id", "type", "status", "closed", "data", "assignedUserId" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "status" integer NOT NULL, "closed" boolean NOT NULL DEFAULT (0), "data" text, "assignedUserId" integer)`);
        await queryRunner.query(`INSERT INTO "task"("id", "type", "status", "closed", "data", "assignedUserId") SELECT "id", "type", "status", "closed", "data", "assignedUserId" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
