import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1767532445739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (name, email, createdAt) VALUES
      ('Alice', 'alice@demo.com', datetime('now')),
      ('Bob', 'bob@demo.com', datetime('now')),
      ('Charlie', 'charlie@demo.com', datetime('now'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users WHERE email LIKE '%@demo.com'
    `);
  }
}
