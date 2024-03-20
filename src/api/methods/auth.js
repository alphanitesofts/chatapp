import {
  postRequest,
  getRequest,
  postWithFormRequest,
  getFilterRequest,
  deleteRequest,
} from '../index';


// Endpoints for Auth
export const loginApi = payload => postWithFormRequest('/login', payload)
export const registerApi = payload => postWithFormRequest('/register', payload)
export const fetchAllLanguages = () => postRequest('/fetch_all_language')
export const fetchUsersById = (id) => postRequest(`/fetch_users_by_id/${id}`, id)
export const updateUserById = (payload, id) => postWithFormRequest(`/update_user_by_id/${id}`, payload, id)
export const deleteUserBydId = (id) => postRequest(`/delete_user_by_id/${id}`, id)
export const sendVerificationCode = (payload) => postWithFormRequest('send_verification_code', payload)
export const resetPasswordApi = (payload) => postWithFormRequest('/reset_password', payload)
export const fetchPublicJoinedGroups = (id) => postRequest(`/fetch_public_groups_user_is_member/${id}`, id)
export const fetchPublicUnjoinedGroups = (id) => postRequest(`/fetch_groups_user_not_member/${id}`, id)
export const postGroup = (payload) => postWithFormRequest('/post_group', payload)
export const fetchGroupMembers = (id) => postRequest(`/fetch_group_members_details/${id}`, id)
export const fetchPrivateGroups = (id) => postRequest(`/fetch_private_groups_user_is_member/${id}`, id)
export const postGroupChat = (payload) => postWithFormRequest('/post_group_chat', payload)
export const fetchGroupChatById = (id) => postRequest(`/fetch_group_chats_by_gid/${id}`, id)
export const postInvitation = (payload) => postWithFormRequest('/post_invitation', payload)
export const fetchUserContacts = (payload) => postWithFormRequest('/fetch_user_contacts', payload)
export const fetchContactRequestsById = (id) => postRequest(`/fetch_contact_requests_by_requested_id/${id}`)
export const updateContactRequestStatus = (payload) => postWithFormRequest(`/update_contact_request_status`, payload)
export const fetchPrivateChats = (payload) => postWithFormRequest(`/fetch_private_chats`, payload)
export const postPrivateChat = (payload) => postWithFormRequest(`/post_private_chat`, payload)
export const fetchPostsById = (id, secondId) => postRequest(`/fetch_posts_by_uid/${id}/${secondId}`, id, secondId)
export const likePostApi = (payload) => postWithFormRequest(`/like_post`, payload)
export const fetchCommentsByPId = (id) => postRequest(`/fetch_comments_by_pid/${id}`, id)
export const addComment = (payload) => postWithFormRequest(`/add_comment`, payload)
export const addPost = (payload) => postWithFormRequest(`/add_post`, payload)
export const fetchRandomUsers = () => postRequest(`/getRandomUsers`)
export const fetchAllUsers = () => postRequest(`/fetch_all_users`)
export const addMember = (payload, id) => postRequest(`/addMembers${id}`, payload, id)
export const changePassword = (payload) => postWithFormRequest(`/changepassword`, payload)
export const fetchInvitationsById = (id) => postRequest(`/fetch_invitations_by_rid/${id}`, id)
export const processInvitation = (payload) => postWithFormRequest(`/process_invitation`, payload)
export const fetchGroupsUserNotMemeber = (id) => postRequest(`/fetch_public_groups_user_not_member/${id}`, id)
export const postContactRequest = (payload) => postWithFormRequest(`/post_contact_request`, payload)
export const deleteMember = (payload, id) => postRequest(`/deleteMembers/${id}`, payload, id)