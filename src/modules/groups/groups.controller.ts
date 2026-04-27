import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { CreateGroupRuleDto } from './dtos/create-group-rule.dto';
import { CreateGroupPostDto } from './dtos/create-group-post.dto';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';
import { GroupMemberRole } from '@prisma/client';

@UseGuards(JwtAuthenticationGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('/')
  async createGroup(
    @currentUser('id') userId: string,
    @Body() dto: CreateGroupDto,
  ) {
    return this.groupsService.createGroup(userId, dto);
  }

  @Get('/')
  async discoverGroups(
    @currentUser('id') userId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
    @Query('search') search?: string,
  ) {
    return this.groupsService.discoverGroups(userId, page, limit, search);
  }

  @Get('/:id')
  async getGroupById(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
  ) {
    return this.groupsService.getGroupById(groupId, userId);
  }

  @Put('/:id')
  async updateGroup(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupsService.updateGroup(groupId, userId, dto);
  }

  @Delete('/:id')
  async deleteGroup(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
  ) {
    return this.groupsService.deleteGroup(groupId, userId);
  }

  @Post('/:id/join')
  async joinGroup(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
  ) {
    return this.groupsService.joinGroup(groupId, userId);
  }

  @Delete('/:id/leave')
  async leaveGroup(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
  ) {
    return this.groupsService.leaveGroup(groupId, userId);
  }

  @Get('/:id/members')
  async getMembers(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.groupsService.getMembers(groupId, userId, page, limit);
  }

  @Put('/:id/members/:userId/role')
  async updateMemberRole(
    @Param('id') groupId: string,
    @currentUser('id') adminId: string,
    @Param('userId') targetUserId: string,
    @Body('role') role: GroupMemberRole,
  ) {
    return this.groupsService.updateMemberRole(
      groupId,
      adminId,
      targetUserId,
      role,
    );
  }

  @Delete('/:id/members/:userId')
  async removeMember(
    @Param('id') groupId: string,
    @currentUser('id') adminId: string,
    @Param('userId') targetUserId: string,
  ) {
    return this.groupsService.removeMember(groupId, adminId, targetUserId);
  }

  @Get('/:id/requests')
  async getJoinRequests(
    @Param('id') groupId: string,
    @currentUser('id') adminId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.groupsService.getJoinRequests(groupId, adminId, page, limit);
  }

  @Put('/:id/requests/:userId')
  async processJoinRequest(
    @Param('id') groupId: string,
    @currentUser('id') adminId: string,
    @Param('userId') targetUserId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.groupsService.processJoinRequest(
      groupId,
      adminId,
      targetUserId,
      approve,
    );
  }

  @Post('/:id/rules')
  async createRule(
    @Param('id') groupId: string,
    @currentUser('id') adminId: string,
    @Body() dto: CreateGroupRuleDto,
  ) {
    return this.groupsService.createRule(groupId, adminId, dto);
  }

  @Delete('/:id/rules/:ruleId')
  async deleteRule(
    @Param('id') groupId: string,
    @currentUser('id') adminId: string,
    @Param('ruleId') ruleId: string,
  ) {
    return this.groupsService.deleteRule(groupId, adminId, ruleId);
  }

  @Post('/:id/posts')
  async addPostToGroup(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
    @Body() dto: CreateGroupPostDto,
  ) {
    return this.groupsService.addPostToGroup(groupId, userId, dto.postId);
  }

  @Get('/:id/posts')
  async getGroupPosts(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.groupsService.getGroupPosts(groupId, userId, page, limit);
  }

  @Put('/:id/posts/:groupPostId/approval')
  async reviewGroupPost(
    @Param('id') groupId: string,
    @Param('groupPostId') groupPostId: string,
    @currentUser('id') adminId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.groupsService.reviewGroupPost(
      groupId,
      groupPostId,
      adminId,
      approve,
    );
  }

  @Get('/:id/insights')
  async getGroupInsights(
    @Param('id') groupId: string,
    @currentUser('id') userId: string,
  ) {
    return this.groupsService.getGroupInsights(groupId, userId);
  }
}
