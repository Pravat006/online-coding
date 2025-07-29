import request from 'supertest';
import { getAuthCookie } from './helpers/authHelper.js';

const BASE_URL = "http://localhost:5054/v0/room";
let authCookie = null;
let secondAuthCookie = null;
let createdRoomId = null;

beforeAll(async () => {
    authCookie = await getAuthCookie();
    // For now, use the same user since we don't have multiple test users
    secondAuthCookie = authCookie;
});

describe("Room API Endpoints", () => {
    describe("Create Room", () => {
        test('should create a room successfully', async () => {
            const response = await request(BASE_URL)
                .post('/create')
                .set('Cookie', authCookie)
                .send({ roomName: "Test Room" });
            expect([200, 201]).toContain(response.statusCode);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.name).toBe('Test Room');
            createdRoomId = response.body.data.id;
        });
        test('should fail to create room without authentication', async () => {
            const response = await request(BASE_URL)
                .post('/create')
                .send({ roomName: "No Auth Room" });
            expect(response.status).toBe(401);
        });
        test('should fail to create room with missing name', async () => {
            const response = await request(BASE_URL)
                .post('/create')
                .set('Cookie', authCookie)
                .send({});
            expect(response.status).toBe(400);
        });
        test('should fail to create room with empty name', async () => {
            const response = await request(BASE_URL)
                .post('/create')
                .set('Cookie', authCookie)
                .send({ roomName: "   " });
            expect(response.status).toBe(400);
        });
    });

    describe("Join Room", () => {
        test('should fail to join a room as the host already in room)', async () => {
            const response = await request(BASE_URL)
                .post(`/join/${createdRoomId}`)
                .set('Cookie', secondAuthCookie);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('You are already a participant in this room');
        });
        test('should fail to join a room twice', async () => {
            const response = await request(BASE_URL)
                .post(`/join/${createdRoomId}`)
                .set('Cookie', secondAuthCookie);
            expect(response.status).toBe(400);
        });
        test('should fail to join a room without authentication', async () => {
            const response = await request(BASE_URL)
                .post(`/join/${createdRoomId}`);
            expect(response.status).toBe(401);
        });
        test('should fail to join a non-existent room', async () => {
            const response = await request(BASE_URL)
                .post(`/join/nonexistentroomid`)
                .set('Cookie', authCookie);
            expect(response.status).toBe(404);
        });
    });

    describe("Leave Room", () => {
        test('should leave a room successfully', async () => {
            const response = await request(BASE_URL)
                .post(`/leave/${createdRoomId}`)
                .set('Cookie', secondAuthCookie);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Left collaboration room successfully');
        });
        test('should fail to leave a room without authentication', async () => {
            const response = await request(BASE_URL)
                .post(`/leave/${createdRoomId}`);
            expect(response.status).toBe(401);
        });
        test('should fail to leave a non-existent room', async () => {
            const response = await request(BASE_URL)
                .post(`/leave/nonexistentroomid`)
                .set('Cookie', authCookie);
            expect(response.status).toBe(404);
        });
    });

    describe("Delete Room", () => {
        test('should delete a room successfully as host', async () => {
            const response = await request(BASE_URL)
                .delete(`/delete/${createdRoomId}`)
                .set('Cookie', authCookie);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Collaboration room deleted successfully');
        });
        test('should fail to delete a room as non-host (same user is host)', async () => {
            const response = await request(BASE_URL)
                .delete(`/delete/${createdRoomId}`)
                .set('Cookie', secondAuthCookie);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Room not found');
        });
        test('should fail to delete a room without authentication', async () => {
            const response = await request(BASE_URL)
                .delete(`/delete/${createdRoomId}`);
            expect(response.status).toBe(401);
        });
        test('should fail to delete a non-existent room', async () => {
            const response = await request(BASE_URL)
                .delete(`/delete/nonexistentroomid`)
                .set('Cookie', authCookie);
            expect(response.status).toBe(404);
        });
    });
});


